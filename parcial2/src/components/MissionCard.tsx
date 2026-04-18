import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonBadge, IonButton, IonIcon
} from '@ionic/react';
import { checkmarkCircle, ellipseOutline } from 'ionicons/icons';

interface Props {
  mission: {
    id: number;
    title: string;
    description: string;
    points: number;
    completed: boolean;
  };
  onStart: () => void;
  disabled?: boolean;
}

function MissionCard({ mission, onStart, disabled }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IonIcon
            icon={mission.completed ? checkmarkCircle : ellipseOutline}
            color={mission.completed ? 'success' : 'medium'}
          />
          {mission.title}
          <IonBadge color="primary" style={{ marginLeft: 'auto' }}>
            {mission.points} pts
          </IonBadge>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{mission.description}</p>
        {!mission.completed && (
          <IonButton
            expand="block"
            onClick={onStart}
            disabled={disabled}
            style={{ marginTop: 8 }}
          >
            Iniciar misión
          </IonButton>
        )}
        {mission.completed && (
          <IonBadge color="success">Completada ✓</IonBadge>
        )}
      </IonCardContent>
    </IonCard>
  );
}

export default MissionCard;