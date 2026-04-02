import { useEffect, useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === "granted";
    } catch (err: any) {
      setError(err);
      return false;
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err: any) {
      setError(err);
    }
  };

  const sendNotification = async ({
    id = Math.floor(Math.random() * 1000),  
    title = "Notificación",
    body = "Mensaje"
  }: any) => {
    try {
      const result = await LocalNotifications.checkPermissions();
      if (result.display !== "granted") {
        await requestPermission();
      }

      await LocalNotifications.schedule({
        notifications: [{
          id,
          title,
          body,
          schedule: { at: new Date(Date.now() + 1000) }, 
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }]
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error enviando notificación:", err);
    }
  };

  const scheduleNotification = async ({
    id = Math.floor(Math.random() * 1000),
    title = "Recordatorio",
    body = "Tienes algo pendiente",
    seconds = 5,
  }: any) => {
    try {
      const result = await LocalNotifications.checkPermissions();
      if (result.display !== "granted") {
        await requestPermission();
      }

      await LocalNotifications.schedule({
        notifications: [{
          id,
          title,
          body,
          schedule: { at: new Date(Date.now() + seconds * 1000) },
          sound: undefined,
          attachments: undefined,
          actionTypeId: "",
          extra: null
        }]
      });
    } catch (err: any) {
      setError(err.message);
      console.error("Error programando notificación:", err);
    }
  };

  useEffect(() => {
    const listener = LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (notification) => {
        console.log("Notificación tocada:", notification);
      }
    );
    checkPermission();
    return () => { listener.then(l => l.remove()); };
  }, []);

  return { permission, error, requestPermission, sendNotification, scheduleNotification };
};