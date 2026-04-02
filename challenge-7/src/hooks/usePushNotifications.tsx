import { useEffect, useState } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export const usePushNotifications = () => {
  const [token, setToken] = useState<any>(null);
  const [notification, setNotification] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const requestPermission = async () => {
    const result = await PushNotifications.requestPermissions();
    if (result.receive === "granted") {
      await PushNotifications.register();
    }
  };

  useEffect(() => {
    PushNotifications.addListener("registration", (token) => {
      setToken(token.value);
    });
    PushNotifications.addListener("registrationError", (err) => {
      setError(err);
    });
    PushNotifications.addListener("pushNotificationReceived", (notif) => {
      setNotification(notif);
    });
    PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
      console.log("Click:", action);
    });

    return () => { PushNotifications.removeAllListeners(); };
  }, []);

  return { token, notification, error, requestPermission };
};