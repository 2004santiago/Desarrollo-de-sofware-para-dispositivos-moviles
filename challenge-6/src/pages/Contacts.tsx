import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel,
  IonInput, IonButton, IonButtons, IonSpinner,
  IonText, IonIcon
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logOutOutline } from "ionicons/icons";
import { useContactsContext } from "../context/ContactsContext";
import { useAuthContext } from "../context/AuthContext";
import useNetwork from "../hooks/useNetwork";

function Contacts() {
  const { contacts, isPending, error, getAll, add, remove } = useContactsContext();
  const { user, logout } = useAuthContext();
  const { isOnline } = useNetwork();
  const history = useHistory();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  useEffect(() => {
    getAll();
  }, []);

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  const handleAdd = async () => {
    if (!nombre.trim()) return;
    await add({ nombre, telefono });
    setNombre("");
    setTelefono("");
    await getAll();
  };

  const handleDelete = async (id: string) => {
    await remove(id);
    await getAll();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonText color={isOnline ? "success" : "danger"}>
          <p>{isOnline ? "Conectado" : "Sin conexión"}</p>
        </IonText>

        <p>Usuario: {user?.email}</p>

        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput
            value={telefono}
            onIonChange={(e) => setTelefono(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleAdd}
          disabled={!isOnline || isPending}
          style={{ marginTop: "16px" }}
        >
          {isPending ? <IonSpinner name="crescent" /> : "Agregar Contacto"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {contacts.map((contact: any) => (
            <IonItem key={contact.id}>
              <IonLabel>
                <h2>{contact.nombre}</h2>
                <p>{contact.telefono}</p>
              </IonLabel>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => handleDelete(contact.id)}
                disabled={!isOnline}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" fill="outline" onClick={() => history.push("/tasks")} style={{ marginTop: "16px" }}>
          Ir a Tareas
        </IonButton>
        <IonButton expand="block" fill="outline" onClick={() => history.push("/fruits")}>
          Ir a Frutas
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

export default Contacts;