import {
  IonPage, IonContent, IonItem,
  IonLabel, IonInput, IonButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      history.push("/contacts");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Login</h2>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleLogin} style={{ marginTop: "16px" }}>
          Ingresar
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          onClick={() => history.push("/register")}
        >
          ¿No tienes cuenta? Regístrate
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;