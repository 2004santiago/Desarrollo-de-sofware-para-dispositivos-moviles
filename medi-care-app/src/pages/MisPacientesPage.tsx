import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Visita } from '../App';
type Props = {
  visitas: Visita[];
};
export default function MisPacientesPage({ visitas }: Props) {
  const pacientesUnicos = Array.from(
    new Map(visitas.map((v) => [v.paciente, v])).values()
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {pacientesUnicos.map((v) => (
            <IonItem key={v.id}>
              <IonLabel>
                <h2>{v.paciente}</h2>
                <p>{v.direccion}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}