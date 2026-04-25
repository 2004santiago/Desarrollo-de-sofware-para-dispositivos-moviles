import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButtons, IonBackButton,
  IonItem, IonLabel, IonButton, IonSpinner
} from "@ionic/react";
import { useDevice } from "../hooks/useDevice";

function DevicePage() {
  const { battery, info, deviceId, loading, refresh } = useDevice();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <>
            <IonItem>
              <IonLabel>
                Batería: {battery ? `${(battery.batteryLevel * 100).toFixed(0)}%` : "N/A"}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                Cargando: {battery?.isCharging ? "Sí" : "No"}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Modelo: {info?.model}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Plataforma: {info?.platform}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>OS: {info?.operatingSystem}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>ID: {deviceId}</IonLabel>
            </IonItem>
          </>
        )}

        <IonButton expand="block" onClick={refresh} style={{ marginTop: "16px" }}>
          Actualizar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default DevicePage;