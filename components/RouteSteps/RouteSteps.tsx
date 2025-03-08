// components/RouteSteps/RouteSteps.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CameraPoint } from '@/types/index';

interface RouteStepsProps {
  path: string[];
  cameras: CameraPoint[];
}

export default function RouteSteps({ path, cameras }: RouteStepsProps) {
  const getLocationName = (id: string) => {
    const camera = cameras.find((cam) => cam.id === id);
    return camera?.name || id;
  };

  return (
    <View style={styles.container}>
      {/* Thêm header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Các chặng đường đi</Text>
      </View>

      {/* Thêm divider */}
      <View style={styles.dividerHeader} />
      <ScrollView style={styles.scrollView}>
        {path.map((pointId, index) => (
          <View key={pointId} style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.locationName}>
                {getLocationName(pointId)}
              </Text>
              {index < path.length - 1 && <View style={styles.divider} />}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 5,
  },
  header: {
    padding: 12,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  dividerHeader: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  scrollView: {
    maxHeight: 180,
    padding: 12,
    paddingTop: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    color: '#212121',
  },
  divider: {
    height: 20,
    width: 2,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
    marginTop: 8,
  },
});
