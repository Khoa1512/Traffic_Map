import { ANIMATION_DURATION } from '@/constants/map';
import { useRef, useState, useEffect } from 'react';
import MapView, { Region } from 'react-native-maps';

export const useMapAnimation = (initialRegion: Region) => {
  const mapRef = useRef<MapView>(null);
  const [mapReady, setMapReady] = useState(false);

  const animateToRegion = (region: Region) => {
    if (mapRef.current && mapReady) {
      mapRef.current.animateToRegion(region, ANIMATION_DURATION);
    }
  };

  useEffect(() => {
    if (mapReady) {
      animateToRegion(initialRegion);
    }
  }, [mapReady, initialRegion]);

  return { mapRef, mapReady, setMapReady, animateToRegion };
};
