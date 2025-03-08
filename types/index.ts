export interface CameraPoint {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  streamUrl: string;
  snapUrl: string;
  trafficDensity: number;
  lastUpdate?: string;
  district: string;
}
// Định nghĩa interface cho coordinates
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Định nghĩa interface cho coordinates
export interface RouteState {
  start: Coordinate | null;
  end: Coordinate | null;
  path: Coordinate[];
}

export interface CameraResponse {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  streamUrl: string;
  trafficDensity: number;
  lastUpdate?: string;
  district: string;
}

export interface TrafficData {
  density: number;
  status: string;
  timestamp: string;
}

export interface CaptureStatus {
  status: 'running' | 'stopped' | 'error';
  captures_count: number;
  last_capture: number | null;
  cameras_count: number;
}
