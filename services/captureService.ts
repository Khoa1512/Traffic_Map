import { API_BASE_URL } from '@/constants/config';
import { CaptureStatus } from '../types';

export const captureService = {
  async startCapture(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/capture/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Error starting capture:', error);
      return false;
    }
  },

  async stopCapture(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/capture/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.status === 'success';
    } catch (error) {
      console.error('Error stopping capture:', error);
      return false;
    }
  },

  async getCaptureStatus(): Promise<CaptureStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/capture/status`);
      return await response.json();
    } catch (error) {
      console.error('Error getting capture status:', error);
      return {
        status: 'error',
        captures_count: 0,
        last_capture: null,
        cameras_count: 0,
      };
    }
  },
};
