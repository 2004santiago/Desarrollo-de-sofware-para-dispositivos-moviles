import {
  IonPage, IonContent, IonItem,
  IonLabel, IonInput, IonButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthContext();
  const history = useHistory();

  const handleRegister = async () => {
    try {
      await register(email, password);
      history.push("/contacts");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Registro</h2>

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

        <IonButton expand="block" onClick={handleRegister} style={{ marginTop: "16px" }}>
          Crear cuenta
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          onClick={() => history.push("/login")}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Register;