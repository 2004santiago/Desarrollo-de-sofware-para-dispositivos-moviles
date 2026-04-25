import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton
} from "@ionic/react";
import { useCamera } from "../hooks/useCamera";

function CameraPage() {
  const { photo, takePhoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={takePhoto}>
          Tomar Foto
        </IonButton>

        {photo && (
          <img
            src={photo}
            alt="foto"
            style={{ marginTop: "16px", width: "100%", borderRadius: "8px" }}
          />
        )}
      </IonContent>
    </IonPage>
  );
}

export default CameraPage;