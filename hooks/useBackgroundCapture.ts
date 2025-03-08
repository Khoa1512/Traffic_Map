// hooks/useBackgroundCapture.ts
import { captureService } from '@/services/captureService';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';


export const useBackgroundCapture = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Bắt đầu capture khi component mount
    const startCapture = async () => {
      try {
        await captureService.startCapture();
      } catch (error) {
        console.error('Failed to start capture:', error);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          await startCapture();
        } else if (
          appState.current === 'active' &&
          nextAppState.match(/inactive|background/)
        ) {
          await captureService.stopCapture();
        }

        appState.current = nextAppState;
      }
    );

    // Khởi động capture service
    startCapture();

    // Cleanup
    return () => {
      subscription.remove();
      captureService.stopCapture();
    };
  }, []);
};
