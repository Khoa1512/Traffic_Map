import { View, StyleSheet } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomMarker from '@/components/Marker/CustomMarker';
import SearchBar from '@/components/SearchBar/SearchBar';
import { QUAN_10_REGION } from '@/constants/region';
import WebView from 'react-native-webview';
import { useBackgroundCapture } from '@/hook/useBackgroundCapture';
import { useCameraData } from '@/hook/useCameraData';


export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  const { cameras: initialCameras, loading, error } = useCameraData(10000);

  if (error) {
    console.error('Error loading cameras:', error);
  }

  const animateToInitialRegion = () => {
    if (mapRef.current && mapReady) {
      mapRef.current.animateToRegion(QUAN_10_REGION, 1000);
    }
  };

  const handleMapReady = () => {
    setMapReady(true);
  };

  useEffect(() => {
    animateToInitialRegion();
  }, [mapReady]);

  useBackgroundCapture();

  const handleMarkerPress = (id: string) => {
    router.push({
      pathname: '/(modals)/camera',
      params: { id },
    });
  };

  const injectedJavaScript = `
    document.querySelector('.header')?.style.display = 'none';
    document.querySelector('.footer')?.style.display = 'none';

    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
      videoContainer.style.height = '100%';
      videoContainer.style.width = '100%';
    }

    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      videoElement.style.objectFit = 'contain';
    }
  `;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={QUAN_10_REGION}
        onMapReady={handleMapReady}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        loadingEnabled={true}
        minZoomLevel={12}
        maxZoomLevel={20}
      >
        {mapReady &&
          initialCameras.map((point) => (
            <Marker
              key={point.id}
              coordinate={{
                latitude: point.latitude,
                longitude: point.longitude,
              }}
              onPress={() => handleMarkerPress(point.id)}
              title={point.name}
              description={`Mật độ giao thông: ${point.trafficDensity.toFixed(
                1
              )}%`}
            >
              <CustomMarker trafficDensity={point.trafficDensity} />
              {/* <MarkerCallout
                name={point.name}
                trafficDensity={point.trafficDensity}
              /> */}
            </Marker>
          ))}
      </MapView>

      <SearchBar
        data={initialCameras}
        onSelectCamera={(camera) => {
          mapRef.current?.animateToRegion(
            {
              latitude: camera.latitude,
              longitude: camera.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            1000
          );
        }}
      />
      <View style={styles.hiddenCaptures}>
        {initialCameras.map((camera) => (
          <WebView
            key={camera.id}
            source={{ uri: camera.streamUrl }}
            style={styles.hiddenWebView}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            injectedJavaScript={injectedJavaScript}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn(
                `WebView received error status code: ${nativeEvent.statusCode}`
              );
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginBottom: 60,
  },
  hiddenCaptures: {
    height: 0,
    width: 0,
    opacity: 0,
    position: 'absolute',
    left: -9999,
    overflow: 'hidden',
  },
  hiddenWebView: {
    width: 1280, // Set một kích thước cố định cho WebView
    height: 720,
    opacity: 0,
  },
});
