import PageLayout from "../components/PageLayout";
import { useLocalNotifications } from "../hooks/useLocalNotifications";
import { AppButton, StatusMessage } from "../components/ui";

function LocalNotificationsPage() {
  const { permission, requestPermission, sendNotification, scheduleNotification } =
    useLocalNotifications();

  return (
    <PageLayout title="Local Notifications">
      <div className="space-y-4">
        <StatusMessage>Permiso: {permission ?? "No verificado"}</StatusMessage>

        <AppButton onClick={requestPermission}>Solicitar permisos</AppButton>

        <AppButton
          onClick={() => sendNotification({
            title: "Hola",
            body: "Esta es una notificacion inmediata"
          })}
        >
          Enviar ahora
        </AppButton>

        <AppButton
          onClick={() => scheduleNotification({
            title: "Recordatorio",
            body: "Esta notificacion fue programada",
            seconds: 5
          })}
          variant="secondary"
        >
          Programar en 5 segundos
        </AppButton>
      </div>
    </PageLayout>
  );
}

export default LocalNotificationsPage;
