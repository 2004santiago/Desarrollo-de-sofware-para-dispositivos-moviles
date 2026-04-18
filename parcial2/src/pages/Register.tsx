import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonText, IonRouterLink
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    setError('');
    try {
      await register(email, password);
      localStorage.setItem('logged', 'true');
      history.push('/home');
    } catch (e) {
      setError('Error al registrar. Verifica los datos.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Registro</h2>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value)}
          />
        </IonItem>
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        <IonButton expand="block" onClick={handleRegister} style={{ marginTop: 16 }}>
          Registrarse
        </IonButton>
        <p style={{ textAlign: 'center', marginTop: 12 }}>
          ¿Ya tienes cuenta? <IonRouterLink routerLink="/login">Inicia sesión</IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
}

export default Register;