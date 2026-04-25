import PageLayout from "../components/PageLayout";
import { useHaptics } from "../hooks/useHaptics";
import { AppButton, StatusMessage } from "../components/ui";

function HapticsPage() {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  return (
    <PageLayout title="Haptics">
      <div className="space-y-4">
        <StatusMessage tone={isAvailable ? "success" : "danger"}>
          {isAvailable ? "Haptics disponible" : "Haptics no disponible"}
        </StatusMessage>

        <div className="grid gap-3 sm:grid-cols-2">
          <AppButton onClick={() => impact("light")}>Impacto suave</AppButton>
          <AppButton onClick={() => impact("medium")} variant="secondary">Impacto medio</AppButton>
          <AppButton onClick={() => impact("heavy")} variant="warning">Impacto fuerte</AppButton>
          <AppButton onClick={() => notify("success")} variant="success">Notificacion exito</AppButton>
          <AppButton onClick={() => notify("warning")} variant="warning">Notificacion advertencia</AppButton>
          <AppButton onClick={() => notify("error")} variant="danger">Notificacion error</AppButton>
        </div>

        <AppButton onClick={() => vibrate(200)} variant="secondary">Vibrar 200ms</AppButton>
      </div>
    </PageLayout>
  );
}

export default HapticsPage;
