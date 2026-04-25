import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonItem, IonLabel, IonText
} from "@ionic/react";
import { usePushNotifications } from "../hooks/usePushNotifications";

function PushNotificationsPage() {
  const { token, notification, error, requestPermission } = usePushNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={requestPermission}>
          Activar Push Notifications
        </IonButton>

        {token && (
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h3>Token del dispositivo:</h3>
              <p>{token}</p>
            </IonLabel>
          </IonItem>
        )}

        {notification && (
          <IonItem>
            <IonLabel>
              <h3>{notification.title}</h3>
              <p>{notification.body}</p>
            </IonLabel>
          </IonItem>
        )}

        {error && (
          <IonText color="danger">
            <p>{error.message}</p>
          </IonText>
        )}

        <IonText color="medium">
        </IonText>
      </IonContent>
    </IonPage>
  );
}

export default PushNotificationsPage;