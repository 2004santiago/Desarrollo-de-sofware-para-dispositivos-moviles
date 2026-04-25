import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonList, IonItem, IonLabel, IonIcon
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  locationOutline, cameraOutline, phonePortraitOutline,
  hardwareChipOutline, phonePortraitOutline as hapticsIcon,
  folderOutline, notificationsOutline, cloudOutline
} from "ionicons/icons";

function Home() {
  const history = useHistory();

  const sensors = [
    { label: "Geolocation", path: "/geolocation", icon: locationOutline },
    { label: "Camera", path: "/camera", icon: cameraOutline },
    { label: "Accelerometer", path: "/accelerometer", icon: phonePortraitOutline },
    { label: "Device", path: "/device", icon: hardwareChipOutline },
    { label: "Haptics", path: "/haptics", icon: hapticsIcon },
    { label: "Filesystem", path: "/filesystem", icon: folderOutline },
    { label: "Local Notifications", path: "/local-notifications", icon: notificationsOutline },
    { label: "Push Notifications", path: "/push-notifications", icon: cloudOutline },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensors App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Selecciona un sensor</h2>
        <IonList>
          {sensors.map((sensor) => (
            <IonItem
              key={sensor.path}
              button
              onClick={() => history.push(sensor.path)}
            >
              <IonIcon icon={sensor.icon} slot="start" />
              <IonLabel>{sensor.label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Home;