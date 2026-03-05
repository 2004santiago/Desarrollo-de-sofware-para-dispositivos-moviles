import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { isLoggedIn, login } from "../services/auth";
import "./Home.css";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  if (isLoggedIn()) {
    history.replace("/home");
  }

  const handleLogin = () => {
    setError("");
    const ok = login(email.trim(), password.trim());
    if (!ok) {
      setError("Credenciales inválidas. Usa user@mail.com / 123");
      return;
    }

    history.push("/home");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="page-container">
          <h2>Iniciar sesión</h2>

          <IonInput
            value={email}
            placeholder="Email"
            onIonInput={(e) => setEmail(e.detail.value ?? "")}
          />

          <IonInput
            value={password}
            placeholder="Password"
            type="password"
            onIonInput={(e) => setPassword(e.detail.value ?? "")}
          />

          <IonButton className="btn-agregar" onClick={handleLogin}>
            Login
          </IonButton>

          {error && (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}