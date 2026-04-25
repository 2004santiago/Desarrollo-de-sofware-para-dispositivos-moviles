import PageLayout from "../components/PageLayout";
import { useGeolocation } from "../hooks/UseGeolocation";
import { AppButton, DataCard, StatusMessage } from "../components/ui";

function GeolocationPage() {
  const { position, error, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <PageLayout title="Geolocation">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <AppButton onClick={getCurrentLocation}>Obtener ubicacion actual</AppButton>
          <AppButton onClick={startTracking} variant="secondary">Iniciar seguimiento</AppButton>
          <AppButton onClick={stopTracking} variant="danger">Detener seguimiento</AppButton>
        </div>

        {position && (
          <div className="grid gap-3 sm:grid-cols-2">
            <DataCard label="Latitud" value={position.latitude} />
            <DataCard label="Longitud" value={position.longitude} />
            <DataCard label="Altitud" value={position.altitude ?? "N/A"} />
            <DataCard label="Velocidad" value={position.speed ?? "N/A"} />
          </div>
        )}

        {error && <StatusMessage tone="danger">{error.message}</StatusMessage>}
      </div>
    </PageLayout>
  );
}

export default GeolocationPage;
