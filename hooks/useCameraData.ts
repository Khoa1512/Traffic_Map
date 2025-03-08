// hooks/useCameraData.ts
import { useState, useEffect } from 'react';
import { CameraPoint } from '@/types/index';
import { fetchAllCameras } from '@/services/routeService';

export const useCameraData = (updateInterval = 10000) => {
  const [cameras, setCameras] = useState<CameraPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCameras = async () => {
      try {
        const data = await fetchAllCameras();
        setCameras(data);
        setError(null);
      } catch (error) {
        console.error('Failed to load cameras:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to load cameras'
        );
      } finally {
        setLoading(false);
      }
    };

    loadCameras();

    // Set up periodic updates
    const intervalId = setInterval(loadCameras, updateInterval);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return { cameras, loading, error };
};
