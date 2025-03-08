import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cctv } from 'lucide-react-native';
import colors from '@/constants/colors';
import styles from './style';

interface CustomMarkerProps {
  size?: number;
  color?: string;
}

export default function CustomMarker({
  size = 24,
  color = colors.primary,
}: CustomMarkerProps) {
  return (
    <View style={styles.markerContainer}>
      <View style={styles.markerBg}>
        <Cctv size={size} color={color} />
      </View>
      <View style={styles.markerArrow} />
    </View>
  );
}
