import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const requestPermission = async () => {
    await LocalNotifications.requestPermissions();
  };
  const schedule = async ({ id = 1, title, body, scheduleAt }) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          schedule: { at: scheduleAt || new Date(Date.now() + 1000) },
        },
      ],
    });
  };
  return { requestPermission, schedule };
};