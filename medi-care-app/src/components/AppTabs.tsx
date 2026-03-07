import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { personCircleOutline, peopleOutline, medicalOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import VisitasPage from '../pages/VisitasPage';
import DetalleVisitaPage from '../pages/DetalleVisitaPage.tsx';
import MisPacientesPage from '../pages/MisPacientesPage.tsx';
import PerfilMedicoPage from '../pages/PerfilMedicoPage.tsx';
import { Visita } from '../App';

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'medico' | 'recepcionista';
  avatar?: string;
};
type Props = {
  usuario: Usuario;
  visitas: Visita[];
  pendientesCount: number;
  onLogout: () => void;
  onActualizarVisita: (id: number, cambios: Partial<Visita>) => void;
  onReordenarPendientes: (nuevoOrdenPendientes: Visita[]) => void;
};
export default function AppTabs({
  usuario,
  visitas,
  pendientesCount,
  onLogout,
  onActualizarVisita,
  onReordenarPendientes,
}: Props) {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/visitas">
          <VisitasPage
            visitas={visitas}
            onActualizarVisita={onActualizarVisita}
            onReordenarPendientes={onReordenarPendientes}
          />
        </Route>

        <Route exact path="/tabs/visitas/:id">
          <DetalleVisitaPage
            visitas={visitas}
            onActualizarVisita={onActualizarVisita}
          />
        </Route>
        <Route exact path="/tabs/pacientes">
          <MisPacientesPage visitas={visitas} />
        </Route>
        <Route exact path="/tabs/perfil">
          <PerfilMedicoPage usuario={usuario} onLogout={onLogout} />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/visitas" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="visitas" href="/tabs/visitas">
          <IonIcon icon={medicalOutline} />
          <IonLabel>Visitas</IonLabel>
          {pendientesCount > 0 && <IonBadge color="danger">{pendientesCount}</IonBadge>}
        </IonTabButton>
        <IonTabButton tab="pacientes" href="/tabs/pacientes">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/tabs/perfil">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}