import PageLayout from "../components/PageLayout";
import { useDevice } from "../hooks/useDevice";
import { AppButton, DataCard, StatusMessage } from "../components/ui";

function DevicePage() {
  const { battery, info, deviceId, loading, refresh } = useDevice();

  return (
    <PageLayout title="Device">
      <div className="space-y-4">
        {loading ? (
          <StatusMessage>Cargando informacion del dispositivo...</StatusMessage>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <DataCard label="Bateria" value={battery ? `${(battery.batteryLevel * 100).toFixed(0)}%` : "N/A"} />
            <DataCard label="Cargando" value={battery?.isCharging ? "Si" : "No"} />
            <DataCard label="Modelo" value={info?.model ?? "N/A"} />
            <DataCard label="Plataforma" value={info?.platform ?? "N/A"} />
            <DataCard label="OS" value={info?.operatingSystem ?? "N/A"} />
            <DataCard label="ID" value={deviceId ?? "N/A"} />
          </div>
        )}

        <AppButton onClick={refresh}>Actualizar</AppButton>
      </div>
    </PageLayout>
  );
}

export default DevicePage;
