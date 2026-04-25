import PageLayout from "../components/PageLayout";
import { usePushNotifications } from "../hooks/usePushNotifications";
import { AppButton, DataCard, StatusMessage } from "../components/ui";

function PushNotificationsPage() {
  const { token, notification, error, requestPermission } = usePushNotifications();

  return (
    <PageLayout title="Push Notifications">
      <div className="space-y-4">
        <AppButton onClick={requestPermission}>Activar push notifications</AppButton>

        {token && (
          <DataCard label="Token del dispositivo" value={token} />
        )}

        {notification && (
          <div className="grid gap-3 sm:grid-cols-2">
            <DataCard label="Titulo" value={notification.title} />
            <DataCard label="Mensaje" value={notification.body} />
          </div>
        )}

        {error && (
          <StatusMessage tone="danger">{error.message}</StatusMessage>
        )}
      </div>
    </PageLayout>
  );
}

export default PushNotificationsPage;
