import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonButton, IonItem, IonLabel, IonText, IonRouterLink
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const handleLogin = async () => {
    setError('');
    try {
      await login(email, password);
      localStorage.setItem('logged', 'true');
      history.push('/home');
    } catch (e) {
      setError('Credenciales inválidas. Intenta de nuevo.');
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mission App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Iniciar sesión</h2>
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
        <IonButton expand="block" onClick={handleLogin} style={{ marginTop: 16 }}>
          Ingresar
        </IonButton>
        <p style={{ textAlign: 'center', marginTop: 12 }}>
          ¿No tienes cuenta? <IonRouterLink routerLink="/register">Regístrate</IonRouterLink>
        </p>
      </IonContent>
    </IonPage>
  );
}

export default Login;