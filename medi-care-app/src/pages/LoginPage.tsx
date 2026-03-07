import { useState } from 'react';

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
type Props = {
  onLogin: (email: string, password: string) => boolean;
};
export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastAbierto, setToastAbierto] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(email, password);
      setLoading(false);

      if (!ok) {
        setToastAbierto(true);
      }
    }, 1500);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MediCare+ Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Ingreso médico</h2>
        </IonText>

        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? '')}
            placeholder="medico@medicare.com"/>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contraseña</IonLabel>
          <IonInput
            type={mostrarPassword ? 'text' : 'password'}
            value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? '')}
            placeholder="1234"/>
        </IonItem>
        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => setMostrarPassword((prev) => !prev)}>
          {mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        </IonButton>

        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          Iniciar sesión
        </IonButton>

        <IonLoading isOpen={loading} message="Verificando credenciales..." />

        <IonToast
          isOpen={toastAbierto}
          onDidDismiss={() => setToastAbierto(false)}
          message="Usuario o contraseña incorrectos"
          duration={2000}
          color="danger"/>
      </IonContent>
    </IonPage>
  );

}