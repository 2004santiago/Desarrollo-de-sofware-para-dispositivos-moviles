import { useHistory } from "react-router-dom";
import PageLayout from "../components/PageLayout";

function Home() {
  const history = useHistory();

  const sensors = [
    { label: "Geolocation", path: "/geolocation", description: "Ubicacion actual y seguimiento en tiempo real." },
    { label: "Camera", path: "/camera", description: "Captura una foto desde el dispositivo." },
    { label: "Accelerometer", path: "/accelerometer", description: "Lectura de ejes, magnitud y deteccion de shake." },
    { label: "Device", path: "/device", description: "Bateria, plataforma y datos del equipo." },
    { label: "Haptics", path: "/haptics", description: "Impactos, vibracion y notificaciones hapticas." },
    { label: "Filesystem", path: "/filesystem", description: "Escritura, lectura y listado de archivos locales." },
    { label: "Local Notifications", path: "/local-notifications", description: "Notificaciones inmediatas y programadas." },
    { label: "Push Notifications", path: "/push-notifications", description: "Permisos, token y mensajes push." },
  ];

  return (
    <PageLayout title="Sensors App" showBackButton={false}>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Selecciona un sensor</h2>
          <p className="mt-1 text-sm text-slate-400">
            La logica del ejercicio se mantiene; solo migramos la interfaz a Tailwind.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {sensors.map((sensor) => (
            <button
              key={sensor.path}
              type="button"
              onClick={() => history.push(sensor.path)}
              className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-left transition hover:border-sky-400/40 hover:bg-slate-800"
            >
              <p className="text-base font-semibold text-white">{sensor.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{sensor.description}</p>
            </button>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Home;
