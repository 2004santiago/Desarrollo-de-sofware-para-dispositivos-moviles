import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
type Usuario = {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'medico' | 'recepcionista';
  avatar?: string;
};
type Props = {
  usuario: Usuario;
  onLogout: () => void;
};

function getIniciales(nombre: string) {
  return nombre
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
export default function PerfilMedicoPage({ usuario, onLogout }: Props) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {usuario.avatar ? (
          <IonAvatar style={{ width: 90, height: 90, marginBottom: 16 }}>
            <IonImg src={usuario.avatar} alt={usuario.nombre} />
          </IonAvatar>
        ) : (
          <IonAvatar
            style={{
              width: 90,
              height: 90,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0C2340',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 28,
            }}>
            {getIniciales(usuario.nombre)}
          </IonAvatar>
        )}
        <IonItem>
          <IonLabel>
            <h2>{usuario.nombre}</h2>
            <p>{usuario.email}</p>
            <p>Rol: {usuario.rol}</p>
          </IonLabel>
        </IonItem>
        <IonButton expand="block" color="danger" className="ion-margin-top" onClick={onLogout}>
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}