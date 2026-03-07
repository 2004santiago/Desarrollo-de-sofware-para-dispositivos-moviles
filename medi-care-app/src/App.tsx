import { Redirect, Route } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import { IonLoading, IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
//import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AppTabs from './components/AppTabs';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
type Usuario = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'medico' | 'recepcionista';
  avatar?: string;
};
type VisitaEstado = 'pendiente' | 'en_camino' | 'finalizada' | 'cancelada';
type Medicamento = {
  id: number;
  nombre: string;
  dosis: string;
};
export type Visita = {
  id: number;
  paciente: string;
  direccion: string;
  horario: string;
  estado: VisitaEstado;
  motivoCancelacion?: string;
  receta: Medicamento[];
};
const STORAGE_USER = 'medicare_medico_logueado';
const STORAGE_VISITAS = 'medicare_visitas';
const usuariosStorage: Usuario[] = [
  {
    id: 1,
    nombre: 'Ana Torres',
    email: 'medico@medicare.com',
    password: '1234',
    rol: 'medico',
  },
  {
    id: 2,
    nombre: 'Luis Perez',
    email: 'recepcion@medicare.com',
    password: '1234',
    rol: 'recepcionista',
  },
];

const visitasIniciales: Visita[] = [
  {
    id: 1,
    paciente: 'Carlos Gómez',
    direccion: 'Calle 10 #20-30',
    horario: '08:00',
    estado: 'pendiente',
    receta: [],
  },
  {
    id: 2,
    paciente: 'María López',
    direccion: 'Cra 15 #45-90',
    horario: '09:30',
    estado: 'pendiente',
    receta: [],
  },
  {
    id: 3,
    paciente: 'Jorge Ramírez',
    direccion: 'Av. Central #100',
    horario: '11:00',
    estado: 'finalizada',
    receta: [],
  },
];
function App() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [cargandoInicial, setCargandoInicial] = useState(true);
  useEffect(() => {
    const userGuardado = localStorage.getItem(STORAGE_USER);
    const visitasGuardadas = localStorage.getItem(STORAGE_VISITAS);
    if (userGuardado) {
      setUsuario(JSON.parse(userGuardado));
    }
    if (visitasGuardadas) {
      setVisitas(JSON.parse(visitasGuardadas));
    } else {
      setVisitas(visitasIniciales);
      localStorage.setItem(STORAGE_VISITAS, JSON.stringify(visitasIniciales));
    }
    setCargandoInicial(false);
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_VISITAS, JSON.stringify(visitas));
  }, [visitas]);
  const login = (email: string, password: string) => {
    const encontrado = usuariosStorage.find(
      (u) => u.email === email && u.password === password
    );
    if (!encontrado) return false;
    setUsuario(encontrado);
    localStorage.setItem(STORAGE_USER, JSON.stringify(encontrado));
    return true;
  };
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem(STORAGE_USER);
  };
  const actualizarVisita = (id: number, cambios: Partial<Visita>) => {
    setVisitas((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...cambios } : v))
    );
  };
  const reordenarPendientes = (nuevoOrdenPendientes: Visita[]) => {
    setVisitas((prev) => {
      const fijas = prev.filter((v) => v.estado !== 'pendiente');
      return [...nuevoOrdenPendientes, ...fijas];
    });
  };
  const pendientesCount = useMemo(
    () => visitas.filter((v) => v.estado === 'pendiente').length,
    [visitas]
  );

//console.log('Pacientes:', visitas);

  return (
    <IonApp>
      <IonReactRouter>
        <IonLoading isOpen={cargandoInicial} message="Cargando app..." />
        {!usuario ? (
          <>
            <Route exact path="/login">
              <LoginPage onLogin={login} />
            </Route>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
            </>
        ) : (
          <>
            <Route path="/tabs">
              <AppTabs
                usuario={usuario}
                visitas={visitas}
                pendientesCount={pendientesCount}
                onLogout={logout}
                onActualizarVisita={actualizarVisita}
                onReordenarPendientes={reordenarPendientes}/>
            </Route>
            <Route exact path="/">
              <Redirect to="/tabs/visitas" />
            </Route>
            <Route path="*">
              <Redirect to="/tabs/visitas" />
            </Route>
          </>
        )}
      </IonReactRouter>
    </IonApp>
  );
}



export default App;
