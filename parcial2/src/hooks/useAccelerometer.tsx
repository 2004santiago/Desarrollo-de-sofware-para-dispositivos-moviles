import { Motion } from '@capacitor/motion';
import { useState, useEffect } from 'react';

export const useAccelerometer = () => {
  const [accel, setAccel] = useState(null);
  useEffect(() => {
    const accelListener = Motion.addListener('accel', event => {
      setAccel(event.acceleration);
    });
    return () => {
      accelListener.then(l => l.remove());
    };
  }, []);
  return { accel };
};