import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonItem, IonLabel, IonText
} from "@ionic/react";
import { useGeolocation } from "../hooks/useGeolocation";

function GeolocationPage() {
  const { position, error, getCurrentLocation, startTracking, stopTracking } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={getCurrentLocation}>
          Obtener ubicación actual
        </IonButton>
        <IonButton expand="block" onClick={startTracking}>
          Iniciar seguimiento
        </IonButton>
        <IonButton expand="block" color="danger" onClick={stopTracking}>
          Detener seguimiento
        </IonButton>

        {position && (
          <>
            <IonItem>
              <IonLabel>Latitud: {position.latitude}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Longitud: {position.longitude}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Altitud: {position.altitude ?? "N/A"}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Velocidad: {position.speed ?? "N/A"}</IonLabel>
            </IonItem>
          </>
        )}

        {error && <IonText color="danger"><p>{error.message}</p></IonText>}
      </IonContent>
    </IonPage>
  );
}

export default GeolocationPage;