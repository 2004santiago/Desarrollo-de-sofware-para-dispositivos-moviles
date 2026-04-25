import PageLayout from "../components/PageLayout";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { AppButton, DataCard, StatusMessage } from "../components/ui";

function AccelerometerPage() {
  const { acceleration, magnitude, isShaking, isMoving, start, stop } =
    useAccelerometer({ threshold: 18 });

  return (
    <PageLayout title="Accelerometer">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <AppButton onClick={start}>Iniciar</AppButton>
          <AppButton onClick={stop} variant="danger">Detener</AppButton>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <DataCard label="Eje X" value={acceleration.x.toFixed(2)} />
          <DataCard label="Eje Y" value={acceleration.y.toFixed(2)} />
          <DataCard label="Eje Z" value={acceleration.z.toFixed(2)} />
          <DataCard label="Magnitud" value={magnitude.toFixed(2)} />
          <DataCard label="Movimiento" value={isMoving ? "Si" : "No"} />
        </div>

        {isShaking && (
          <StatusMessage tone="warning">
            <p className="text-center text-base font-semibold">Shake detectado</p>
          </StatusMessage>
        )}
      </div>
    </PageLayout>
  );
}

export default AccelerometerPage;
