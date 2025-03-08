import { useState } from 'react';
import { RouteState } from '../types';

export const useRouteSelection = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [selectingPoint, setSelectingPoint] = useState<'start' | 'end' | null>(
    null
  );
  const [routeCoordinates, setRouteCoordinates] = useState<RouteState>({
    start: null,
    end: null,
    path: [],
  });

  return {
    start,
    setStart,
    end,
    setEnd,
    selectingPoint,
    setSelectingPoint,
    routeCoordinates,
    setRouteCoordinates,
  };
};
