import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonList, IonItem, IonLabel, IonBadge, IonButton, IonProgressBar
} from '@ionic/react';
import { useMissions } from '../context/MissionContext';
import { useAuth } from '../context/AuthContext';

const FAKE_RANKING = [
  { email: 'carlos', points: 180 },
  { email: 'maria', points: 160 },
  { email: 'pedro', points: 90 },
  { email: 'ana', points: 40 },
];

function Results() {
  const { missions, points } = useMissions();
  const { user } = useAuth();
  const completedCount = missions.filter(m => m.completed).length;
  const progress = completedCount / missions.length;
  const allUsers = [
    ...FAKE_RANKING,
    { email: user?.email || 'Tú', points },
  ].sort((a, b) => b.points - a.points);

  const myPosition = allUsers.findIndex(u => u.email === user?.email) + 1;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Tu progreso</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Puntos totales:</strong> {points}</p>
            <p><strong>Misiones completadas:</strong> {completedCount} / {missions.length}</p>
            <IonProgressBar value={progress} color="success" style={{ marginTop: 8 }} />
            <p style={{ marginTop: 8 }}>
              {completedCount === missions.length
                ? '¡Misión cumplida!'
                : completedCount === 0
                ? 'Aún no has completado misiones'
                : ''}
            </p>
            <p>Tu posición en el ranking: #{myPosition}</p>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Ranking Top 5</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {allUsers.slice(0, 5).map((u, i) => {
                const isMe = u.email === user?.email;
                return (
                  <IonItem key={i} color={isMe ? 'light' : undefined}>
                    <IonLabel>
                      <strong>{i + 1}.</strong>{' '}
                      {isMe ? <strong>{u.email} (tú)</strong> : u.email}
                    </IonLabel>
                    <IonBadge slot="end" color={i === 0 ? 'warning' : 'primary'}>
                      {u.points} pts
                    </IonBadge>
                  </IonItem>
                );
              })}
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonButton expand="block" routerLink="/home" fill="outline">
          Volver a misiones
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Results;