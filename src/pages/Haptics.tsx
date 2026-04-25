import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonText
} from "@ionic/react";
import { useHaptics } from "../hooks/useHaptics";

function HapticsPage() {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Haptics</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color={isAvailable ? "success" : "danger"}>
          <p>{isAvailable ? "✅ Haptics disponible" : "❌ Haptics no disponible"}</p>
        </IonText>

        <IonButton expand="block" onClick={() => impact("light")}>
          Impacto Suave
        </IonButton>
        <IonButton expand="block" onClick={() => impact("medium")}>
          Impacto Medio
        </IonButton>
        <IonButton expand="block" onClick={() => impact("heavy")}>
          Impacto Fuerte
        </IonButton>
        <IonButton expand="block" color="success" onClick={() => notify("success")}>
          Notificación Éxito
        </IonButton>
        <IonButton expand="block" color="warning" onClick={() => notify("warning")}>
          Notificación Advertencia
        </IonButton>
        <IonButton expand="block" color="danger" onClick={() => notify("error")}>
          Notificación Error
        </IonButton>
        <IonButton expand="block" onClick={() => vibrate(200)}>
          Vibrar 200ms
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default HapticsPage;