import { useMemo, useState } from 'react';
import {
  IonAlert,
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonReorder,
  IonReorderGroup,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  ItemReorderEventDetail,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Visita } from '../App';

type Filtro = 'todas' | 'pendiente' | 'en_camino' | 'finalizada';

type Props = {
  visitas: Visita[];
  onActualizarVisita: (id: number, cambios: Partial<Visita>) => void;
  onReordenarPendientes: (nuevoOrdenPendientes: Visita[]) => void;
};

export default function VisitasPage({
  visitas,
  onActualizarVisita,
  onReordenarPendientes,
}: Props) {
  const history = useHistory();
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [visitaCancelar, setVisitaCancelar] = useState<Visita | null>(null);

  const visitasFiltradas = useMemo(() => {
    if (filtro === 'todas') return visitas;
    return visitas.filter((v) => v.estado === filtro);
  }, [visitas, filtro]);

  const pendientes = visitasFiltradas.filter((v) => v.estado === 'pendiente');
  const fijas = visitasFiltradas.filter((v) => v.estado !== 'pendiente');

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const reordenadas = event.detail.complete([...pendientes]) as Visita[];
    onReordenarPendientes(reordenadas);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas del día</IonTitle>
          <IonButtons slot="end">
            <IonBadge color="primary">{visitas.filter(v => v.estado === 'pendiente').length}</IonBadge>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSegment
          value={filtro}
          onIonChange={(e) => setFiltro((e.detail.value as Filtro) || 'todas')}
        >
          <IonSegmentButton value="todas">
            <IonLabel>Todas</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pendiente">
            <IonLabel>Pendientes</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="en_camino">
            <IonLabel>En curso</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="finalizada">
            <IonLabel>Finalizadas</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList className="ion-margin-top">
          <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
            {pendientes.map((visita) => (
              <IonItemSliding key={visita.id}>
                <IonItem>
                  <IonLabel>
                    <h2>{visita.paciente}</h2>
                    <p>{visita.direccion}</p>
                    <p>{visita.horario}</p>
                    <p>Estado: {visita.estado}</p>
                  </IonLabel>
                  <IonReorder slot="end" />
                </IonItem>

                <IonItemOptions side="start">
                  <IonItemOption
                    color="secondary"
                    onClick={() => history.push(`/tabs/visitas/${visita.id}`)}
                  >
                    Ver detalle
                  </IonItemOption>
                </IonItemOptions>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="primary"
                    onClick={() =>
                      onActualizarVisita(visita.id, { estado: 'en_camino' })
                    }
                  >
                    En camino
                  </IonItemOption>

                  <IonItemOption
                    color="danger"
                    onClick={() => setVisitaCancelar(visita)}
                  >
                    Cancelar
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonReorderGroup>

          {fijas.map((visita) => (
            <IonItemSliding key={visita.id}>
              <IonItem>
                <IonLabel>
                  <h2>{visita.paciente}</h2>
                  <p>{visita.direccion}</p>
                  <p>{visita.horario}</p>
                  <p>Estado: {visita.estado}</p>
                  {visita.motivoCancelacion && (
                    <p>Motivo: {visita.motivoCancelacion}</p>
                  )}
                </IonLabel>
              </IonItem>

              <IonItemOptions side="start">
                <IonItemOption
                  color="secondary"
                  onClick={() => history.push(`/tabs/visitas/${visita.id}`)}
                >
                  Ver detalle
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonAlert
          isOpen={!!visitaCancelar}
          onDidDismiss={() => setVisitaCancelar(null)}
          header="Cancelar visita"
          inputs={[
            {
              name: 'motivo',
              type: 'text',
              placeholder: 'Motivo de cancelación',
            },
          ]}
          buttons={[
            {
              text: 'No',
              role: 'cancel',
            },
            {
              text: 'Sí, cancelar',
              handler: (data) => {
                if (visitaCancelar) {
                  onActualizarVisita(visitaCancelar.id, {
                    estado: 'cancelada',
                    motivoCancelacion: data.motivo || '',
                  });
                }
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
}