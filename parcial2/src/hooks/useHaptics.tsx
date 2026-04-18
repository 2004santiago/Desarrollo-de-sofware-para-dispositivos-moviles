import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

export const useHaptics = () => {
  const impact = async (style = ImpactStyle.Medium) => {
    await Haptics.impact({ style });
  };
  const vibrate = async () => {
    await Haptics.vibrate();
  };
  const notification = async (type = NotificationType.Success) => {
    await Haptics.notification({ type });
  };
  return { impact, vibrate, notification };
};