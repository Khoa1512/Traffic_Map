// components/MarkerCallout/MarkerCallout.tsx
import { View, Text } from 'react-native';
import { Callout } from 'react-native-maps';
import styles from './style';

interface MarkerCalloutProps {
  name: string;
  trafficDensity: number;
}

export default function MarkerCallout({
  name,
  trafficDensity,
}: MarkerCalloutProps) {
  return (
    <Callout>
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>{name}</Text>
        <Text style={styles.calloutText}>
          Mật độ giao thông: {trafficDensity.toFixed(1)}%
        </Text>
      </View>
    </Callout>
  );
}

