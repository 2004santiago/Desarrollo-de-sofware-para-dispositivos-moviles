import { useMemo, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Visita } from '../App.tsx';
type Props = {
  visitas: Visita[];
  onActualizarVisita: (id: number, cambios: Partial<Visita>) => void;
};
export default function DetalleVisitaPage({ visitas, onActualizarVisita }: Props) {
  const { id } = useParams<{ id: string }>();

  const visita = useMemo(
    () => visitas.find((v) => v.id === Number(id)),
    [visitas, id]
  );
  const [nombreMed, setNombreMed] = useState('');
  const [dosis, setDosis] = useState('');

  if (!visita) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalle</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Visita no encontrada</IonContent>
      </IonPage>
    );
  }
  const agregarMedicamento = () => {
    if (!nombreMed.trim() || !dosis.trim()) return;
    const nuevaReceta = [
      ...visita.receta,
      {
        id: Date.now(),
        nombre: nombreMed,
        dosis,
      },
    ];
    onActualizarVisita(visita.id, { receta: nuevaReceta });
    setNombreMed('');
    setDosis('');
  };
  const finalizarVisita = () => {
    onActualizarVisita(visita.id, { estado: 'finalizada' });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{visita.paciente}</h2>
        <p>{visita.direccion}</p>
        <p>{visita.horario}</p>
        <p>Estado: {visita.estado}</p>
        <IonItem>
          <IonLabel position="stacked">Medicamento</IonLabel>
          <IonInput
            value={nombreMed}
            onIonInput={(e) => setNombreMed(e.detail.value ?? '')}/>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Dosis</IonLabel>
          <IonInput
            value={dosis}
            onIonInput={(e) => setDosis(e.detail.value ?? '')}/>
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={agregarMedicamento}>
          Agregar a receta
        </IonButton>
        <IonList className="ion-margin-top">
          {visita.receta.map((med) => (
            <IonItem key={med.id}>
              <IonLabel>
                {med.nombre} - {med.dosis}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonButton
          expand="block"
          color="success"
          className="ion-margin-top"
          onClick={finalizarVisita}>
          Finalizar visita
        </IonButton>
      </IonContent>
    </IonPage>
  );
}