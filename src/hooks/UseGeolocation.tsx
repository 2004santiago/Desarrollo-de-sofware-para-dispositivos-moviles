import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

export const useGeolocation = () => {
  const [position, setPosition] = useState<any>(null);
  const [watchId, setWatchId] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [permissionStatus, setPermissionStatus] = useState<any>(null);

  // --- Solicitar permiso ---
  const requestPermission = async () => {
    try {
      const permission = await Geolocation.requestPermissions();
      setPermissionStatus(permission.location);
      return permission.location === "granted";
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const granted = await requestPermission();
      if (!granted) {
        setError({ message: "Permiso de ubicación denegado" });
        return;
      }
      const pos = await Geolocation.getCurrentPosition();
      setPosition(pos.coords);
    } catch (err) {
      setError(err);
    }
  };

  const startTracking = async () => {
    try {
      const granted = await requestPermission();
      if (!granted) {
        setError({ message: "Permiso de ubicación denegado" });
        return;
      }
      const id = await Geolocation.watchPosition(
        { enableHighAccuracy: true },
        (pos, err) => {
          if (err) { setError(err); return; }
          setPosition(pos?.coords);
        }
      );
      setWatchId(id);
    } catch (err) {
      setError(err);
    }
  };

  const stopTracking = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
    }
  };

  return {
    position,
    error,
    permissionStatus,
    requestPermission,
    getCurrentLocation,
    startTracking,
    stopTracking
  };
};