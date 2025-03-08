import { useLocalSearchParams, Stack } from 'expo-router';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import WebView from 'react-native-webview';
import React, { useEffect, useState } from 'react';
import { CameraPoint } from '@/types/index';
import { fetchAllCameras } from '@/services/routeService';

export default function CameraScreen() {
  const params = useLocalSearchParams();
  const [cameraState, setCameraState] = useState<CameraPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCamera = async () => {
    try {
      const camerasData = await fetchAllCameras();
      const camera = camerasData.find((cam) => cam.id === params.id);
      if (camera) {
        setCameraState(camera); // Set trực tiếp camera được tìm thấy
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch camera');
      console.error('Error loading camera:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCamera(); // Load lần đầu

    const intervalId = setInterval(loadCamera, 10000);

    return () => clearInterval(intervalId); // Cleanup
  }, [params.id]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!cameraState) return <Text>Camera not found</Text>;

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
    <>
      <Stack.Screen
        options={{
          title: cameraState.name,
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <WebView
            source={{
              uri: cameraState.streamUrl,
            }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            androidLayerType='hardware'
            androidHardwareAccelerationDisabled={false}
            injectedJavaScript={injectedJavaScript}
            onLoadEnd={() => {
              console.log('WebView loaded');
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn('WebView error: ', nativeEvent);
            }}
          />
        </View>

        <ScrollView style={styles.infoContainer} bounces={false}>
          <View style={styles.infoHeader}>
            <Text style={styles.locationTitle}>{cameraState.name}</Text>
            <Text style={styles.district}>{cameraState.district}</Text>
          </View>

          <View style={styles.trafficInfoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Mật độ giao thông</Text>
              <View style={styles.densityIndicator}>
                <View
                  style={[
                    styles.densityBar,
                    {
                      width: `${cameraState.trafficDensity}%`,
                      backgroundColor:
                        cameraState.trafficDensity > 80
                          ? '#FF4444'
                          : cameraState.trafficDensity > 50
                          ? '#FFA000'
                          : '#4CAF50',
                    },
                  ]}
                />
              </View>
              <Text style={styles.densityText}>
                {cameraState.trafficDensity.toFixed(1)}%
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Tình trạng lưu thông</Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      cameraState.trafficDensity > 80
                        ? '#FF4444'
                        : cameraState.trafficDensity > 50
                        ? '#FFA000'
                        : '#4CAF50',
                  },
                ]}
              >
                {cameraState.trafficDensity > 80
                  ? 'Kẹt xe nghiêm trọng'
                  : cameraState.trafficDensity > 50
                  ? 'Lưu thông chậm'
                  : 'Lưu thông tốt'}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Thời gian cập nhật</Text>
              <Text style={styles.updateTime}>
                {new Date().toLocaleTimeString('vi-VN')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  videoContainer: {
    height: '40%',
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  infoContainer: {
    flex: 1,
  },
  infoHeader: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  district: {
    fontSize: 16,
    color: '#757575',
  },
  trafficInfoContainer: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  densityIndicator: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  densityBar: {
    height: '100%',
    borderRadius: 4,
  },
  densityText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#616161',
  },
  statusText: {
    fontSize: 16,
    color: '#616161',
  },
  updateTime: {
    fontSize: 16,
    color: '#616161',
  },
});
