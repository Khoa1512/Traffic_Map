  import { useMemo, useCallback, useEffect, useState } from 'react';
  import { View, StyleSheet, Alert } from 'react-native';
  import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
  import NavigationSearch from '@/components/NavigationSearch/NavigationSearch';
  import { MAP_CONFIG, MARKER_COLORS } from '@/constants/map';
  import { QUAN_10_REGION } from '@/constants/region';
  import { useMapAnimation } from '@/hook/useMapAnimation';
  import { useRouteSelection } from '@/hook/useRouteSelection';
  import { fetchAllCameras, fetchRoute } from '@/services/routeService';
  import { CameraPoint, Coordinate } from '@/types/index';
  import MarkerNavigation from '@/components/Marker/MarkerNavigation';
import RouteSteps from '@/components/RouteSteps/RouteSteps';

  export default function Navigation() {
    const [cameras, setCameras] = useState<CameraPoint[]>([]);
    const { mapRef, mapReady, setMapReady } = useMapAnimation(QUAN_10_REGION);
    const [routePath, setRoutePath] = useState<string[]>([]);
    const {
      start,
      setStart,
      end,
      setEnd,
      selectingPoint,
      setSelectingPoint,
      routeCoordinates,
      setRouteCoordinates,
    } = useRouteSelection();

    // Fetch cameras data
    useEffect(() => {
      const loadCameras = async () => {
        try {
          const data = await fetchAllCameras();
          setCameras(data);
        } catch (error) {
          console.error('Failed to load cameras:', error);
          Alert.alert('Thông báo', 'Không thể tải dữ liệu camera');
        }
      };

      loadCameras();
    }, []);

    const handleMarkerPress = useCallback(
      (point: CameraPoint) => {
        if (!selectingPoint) return;

        const isStartPoint = selectingPoint === 'start';
        const existingPoint = isStartPoint ? end : start;

        if (point.name === existingPoint) {
          Alert.alert(
            'Thông báo',
            `Điểm ${
              isStartPoint ? 'xuất phát' : 'đến'
            } không thể trùng với điểm ${isStartPoint ? 'đến' : 'xuất phát'}`
          );
          return;
        }

        if (isStartPoint) {
          setStart(point.name);
        } else {
          setEnd(point.name);
        }

        setRouteCoordinates((prev) => ({
          ...prev,
          [selectingPoint]: {
            latitude: point.latitude,
            longitude: point.longitude,
          },
          path: [],
        }));
        setRoutePath([]);
        setSelectingPoint(null);
      },
      [selectingPoint, start, end]
    );

    const handlePointSelection = useCallback(
      (type: 'start' | 'end') => {
        setSelectingPoint(type);
        if (type === 'start' && start) {
          setStart('');
          setRouteCoordinates((prev) => ({ ...prev, start: null, path: [] }));
          setRoutePath([]);
        } else if (type === 'end' && end) {
          setEnd('');
          setRouteCoordinates((prev) => ({ ...prev, end: null, path: [] }));
          setRoutePath([]);
        }
      },
      [start, end]
    );

    const handleFindRoute = useCallback(async () => {
      if (!start || !end) {
        Alert.alert('Thông báo', 'Vui lòng chọn điểm xuất phát và điểm đến');
        return;
      }

      try {
        const startPoint = cameras.find((point) => point.name === start);
        const endPoint = cameras.find((point) => point.name === end);

        if (!startPoint || !endPoint) {
          throw new Error('Không tìm thấy điểm đầu hoặc điểm cuối');
        }

        const data = await fetchRoute(startPoint.id, endPoint.id);
        if (data.success && data.path?.length >= 2) {
          setRoutePath(data.path);
          const pathCoordinates = data.path
            .map((pointId: string) => {
              const point = cameras.find((c) => c.id === pointId);
              return point
                ? {
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }
                : null;
            })
            .filter((coord: Coordinate): coord is Coordinate => coord !== null);

          setRouteCoordinates({
            start: pathCoordinates[0],
            end: pathCoordinates[pathCoordinates.length - 1],
            path: pathCoordinates,
          });
        } else {
          Alert.alert('Thông báo', data.message || 'Không tìm thấy đường đi');
        }
      } catch (error) {
        console.error('Error finding route:', error);
        Alert.alert('Thông báo', 'Có lỗi xảy ra khi tìm đường');
      }
    }, [start, end, cameras]);

    const markers = useMemo(
      () =>
        mapReady &&
        cameras.map((point) => (
          <Marker
            key={point.id}
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
            title={point.name}
            onPress={() => handleMarkerPress(point)}
          >
            <MarkerNavigation
              color={
                start === point.name
                  ? MARKER_COLORS.START
                  : end === point.name
                  ? MARKER_COLORS.END
                  : MARKER_COLORS.DEFAULT
              }
            />
          </Marker>
        )),
      [mapReady, cameras, start, end, handleMarkerPress]
    );

    return (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={QUAN_10_REGION}
          onMapReady={() => setMapReady(true)}
          showsUserLocation
          showsMyLocationButton
          showsCompass
          showsScale
          zoomEnabled
          zoomControlEnabled
          loadingEnabled
          minZoomLevel={MAP_CONFIG.MIN_ZOOM}
          maxZoomLevel={MAP_CONFIG.MAX_ZOOM}
        >
          {markers}
          {routeCoordinates.path.length > 0 && (
            <Polyline
              coordinates={routeCoordinates.path}
              strokeColor={MARKER_COLORS.DEFAULT}
              strokeWidth={5}
            />
          )}
        </MapView>

        <NavigationSearch
          start={start}
          end={end}
          setStart={(newStart) => {
            setStart(newStart);
            setRoutePath([]); // Reset routePath
          }}
          setEnd={(newEnd) => {
            setEnd(newEnd);
            setRoutePath([]); // Reset routePath
          }}
          onSearch={handleFindRoute}
          onStartFocus={() => handlePointSelection('start')}
          onEndFocus={() => handlePointSelection('end')}
          selectingPoint={selectingPoint}
          cameras={cameras}
        />

        {routePath.length > 0 && (
          <RouteSteps path={routePath} cameras={cameras} />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    map: {
      flex: 1,
      marginBottom: 60,
    },
  });
