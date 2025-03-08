import React from 'react';
import { View } from 'react-native';
import { Cctv } from 'lucide-react-native';
import styles from './style';

interface CustomMarkerProps {
  size?: number;
  trafficDensity: number;
}

export default function CustomMarker({ size = 24, trafficDensity }: CustomMarkerProps) {
  const getMarkerColor = () => {
    if (trafficDensity > 80) return '#FF4444';
    if (trafficDensity > 50) return '#FFA000';
    return '#4CAF50';
  };

  return (
    <View style={styles.markerContainer}>
      <View style={styles.markerBg}>
        <Cctv size={size} color={getMarkerColor()} />
      </View>
      <View style={styles.markerArrow} />
    </View>
  );
}
