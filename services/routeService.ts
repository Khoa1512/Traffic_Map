import { API_BASE_URL } from '@/constants/config';
import { CameraPoint } from '../types';

export const fetchAllCameras = async (): Promise<CameraPoint[]> => {
  try {
    console.log('Starting API call to:', `${API_BASE_URL}/cameras`);
    const response = await fetch(`${API_BASE_URL}/cameras`);
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cameras:', error);
    throw error;
  }
};

export const fetchRoute = async (startId: string, endId: string) => {
  const response = await fetch(`${API_BASE_URL}/find-path`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ start: startId, end: endId }),
  });
  return response.json();
};
