import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonText
} from "@ionic/react";
import { useLocalNotifications } from "../hooks/useLocalNotifications";

function LocalNotificationsPage() {
  const { permission, requestPermission, sendNotification, scheduleNotification } =
    useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Local Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText>
          <p>Permiso: {permission ?? "No verificado"}</p>
        </IonText>

        <IonButton expand="block" onClick={requestPermission}>
          Solicitar Permisos
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => sendNotification({
            title: "¡Hola!",
            body: "Esta es una notificación inmediata"
          })}
        >
          Enviar ahora
        </IonButton>

        <IonButton
          expand="block"
          onClick={() => scheduleNotification({
            title: "Recordatorio",
            body: "Esta notificación fue programada",
            seconds: 5
          })}
        >
          Programar en 5 segundos
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default LocalNotificationsPage;