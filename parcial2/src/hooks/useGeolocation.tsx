import { Geolocation } from '@capacitor/geolocation';
import { useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const getCurrentPosition = async () => {
    const pos = await Geolocation.getCurrentPosition();
    setCoords(pos.coords);
    return pos.coords;
  };
  const watchPosition = (callback) => {
    return Geolocation.watchPosition({}, (pos) => {
      setCoords(pos.coords);
      callback?.(pos.coords);
    });
  };
  return { coords, getCurrentPosition, watchPosition };
};