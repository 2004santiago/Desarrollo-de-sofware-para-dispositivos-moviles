import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonItem, IonLabel, IonText
} from "@ionic/react";
import { useAccelerometer } from "../hooks/useAccelerometer";

function AccelerometerPage() {
  const { acceleration, magnitude, isShaking, isMoving, start, stop } =
    useAccelerometer({ threshold: 18 });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Accelerometer</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={start}>Iniciar</IonButton>
        <IonButton expand="block" color="danger" onClick={stop}>Detener</IonButton>

        <IonItem>
          <IonLabel>X: {acceleration.x.toFixed(2)}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Y: {acceleration.y.toFixed(2)}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Z: {acceleration.z.toFixed(2)}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Magnitud: {magnitude.toFixed(2)}</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Movimiento: {isMoving ? "Sí" : "No"}</IonLabel>
        </IonItem>

        {isShaking && (
          <IonText color="warning">
            <h1 style={{ textAlign: "center" }}>¡SHAKE DETECTADO!</h1>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
}

export default AccelerometerPage;