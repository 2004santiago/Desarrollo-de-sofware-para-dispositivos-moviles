import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonProgressBar, IonText, IonList, IonAlert
} from '@ionic/react';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMissions } from '../context/MissionContext';
import { useCamera } from '../hooks/useCamera';
import { useGeolocation } from '../hooks/useGeolocation';
import { useHaptics } from '../hooks/useHaptics';
import { useLocalNotifications } from '../hooks/useLocalNotifications';
import { useAccelerometer } from '../hooks/useAccelerometer';
import MissionCard from '../components/MissionCard';

function Home() {
  const { user, logout } = useAuth();
  const { missions, points, totalDistance, loadProgress, completeMission, addDistance } = useMissions();
  const { takePhoto } = useCamera();
  const { getCurrentPosition, watchPosition } = useGeolocation();
  const { vibrate } = useHaptics();
  const { requestPermission, schedule } = useLocalNotifications();
  const { accel } = useAccelerometer();
  const history = useHistory();
  const [mission2Active, setMission2Active] = useState(false);
  const [mission3Active, setMission3Active] = useState(false);
  const [stillSeconds, setStillSeconds] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const stillTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stillCountRef = useRef(0);
  const originRef = useRef<any>(null);
  const watchIdRef = useRef<any>(null);
  const sessionDistanceRef = useRef(0);

  useEffect(() => {
    if (user?.uid) {
      loadProgress(user.uid);
      requestPermission();
    }
  }, [user]);

  useEffect(() => {
    return () => {
      if (stillTimer.current) clearInterval(stillTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!mission3Active || missions[2].completed) return;

    if (accel) {
      const { x, y, z } = accel;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const isStill = magnitude < 1.5;

      if (isStill) {
        if (!stillTimer.current) {
          stillCountRef.current = 0;
          stillTimer.current = setInterval(() => {
            stillCountRef.current += 1;
            setStillSeconds(stillCountRef.current);
            if (stillCountRef.current >= 10) {
              clearInterval(stillTimer.current!);
              stillTimer.current = null;
              handleCompleteMission3();
            }
          }, 1000);
        }
      } else {
        if (stillTimer.current) {
          clearInterval(stillTimer.current);
          stillTimer.current = null;
          stillCountRef.current = 0;
          setStillSeconds(0);
        }
      }
    }
    return () => {
      if (stillTimer.current) clearInterval(stillTimer.current);
    };
  }, [accel, mission3Active]);

  const notify = ({ id, title, body }: { id: number; title: string; body: string }) => {
    schedule({ id, title, body });
  };

  const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const startMission1 = async () => {
    try {
      const dataUrl = await takePhoto();
      if (dataUrl) {
        completeMission(user!.uid, 1, notify);
      }
    } catch (e) {
      setAlertMsg('No se pudo tomar la foto. Verifica los permisos de cámara.');
      setShowAlert(true);
    }
  };

  const startMission2 = async () => {
    if (mission2Active || missions[1].completed) return;
    setMission2Active(true);
    sessionDistanceRef.current = 0;

    try {
      const origin = await getCurrentPosition();
      originRef.current = origin;
      let lastCoords = origin;

      watchIdRef.current = await watchPosition(async (newCoords: any) => {
        const step = calcDistance(
          lastCoords.latitude, lastCoords.longitude,
          newCoords.latitude, newCoords.longitude
        );
        lastCoords = newCoords;
        sessionDistanceRef.current += step;

        const totalFromOrigin = calcDistance(
          originRef.current.latitude, originRef.current.longitude,
          newCoords.latitude, newCoords.longitude
        );

        if (totalFromOrigin >= 50 && !missions[1].completed) {
          if (watchIdRef.current) {
            const { Geolocation } = await import('@capacitor/geolocation');
            await Geolocation.clearWatch({ id: watchIdRef.current });
            watchIdRef.current = null;
          }
          addDistance(user!.uid, sessionDistanceRef.current);
          completeMission(user!.uid, 2, notify, sessionDistanceRef.current);
          setMission2Active(false);
        }
      });
    } catch (e) {
      setMission2Active(false);
      setAlertMsg('No se pudo obtener la ubicación. Verifica los permisos.');
      setShowAlert(true);
    }
  };
  const startMission3 = () => {
    setMission3Active(true);
    setStillSeconds(0);
  };
  const handleCompleteMission3 = async () => {
    setMission3Active(false);
    await vibrate();
    completeMission(user!.uid, 3, notify);
  };
  const handleLogout = () => {
    logout();
    history.push('/login');
  };
  const completedCount = missions.filter(m => m.completed).length;
  const progress = completedCount / missions.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButton slot="end" fill="clear" onClick={handleLogout}>
            Salir
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonText color="medium">
          <p style={{ margin: '0 0 4px' }}>{user?.email}</p>
        </IonText>

        <IonText>
          <h2 style={{ margin: '0 0 4px' }}>Puntos: {points}</h2>
        </IonText>

        <p style={{ margin: '0 0 8px' }}>
          {completedCount} / {missions.length} misiones completadas
        </p>
        <IonProgressBar value={progress} color="primary" />

        <IonList style={{ marginTop: 16 }}>
          <MissionCard
            mission={missions[0]}
            onStart={startMission1}
            disabled={missions[0].completed}
          />

          <MissionCard
            mission={missions[1]}
            onStart={startMission2}
            disabled={mission2Active || missions[1].completed}
          />
          {mission2Active && (
            <IonText color="primary">
              <p style={{ paddingLeft: 16 }}>Rastreando</p>
            </IonText>
          )}

          <MissionCard
            mission={missions[2]}
            onStart={startMission3}
            disabled={!missions[1].completed || missions[2].completed}
          />
          {mission3Active && !missions[2].completed && (
            <IonText color="warning">
              <p style={{ paddingLeft: 16 }}>
                Quieto {stillSeconds} / 10 segundos
              </p>
            </IonText>
          )}
        </IonList>

        <IonButton
          expand="block"
          routerLink="/results"
          style={{ marginTop: 24 }}
        >
          Ver resultados
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Aviso"
          message={alertMsg}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
}

export default Home;