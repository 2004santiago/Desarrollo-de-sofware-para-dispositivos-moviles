import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel,
  IonInput, IonButton, IonButtons, IonSpinner,
  IonText, IonBackButton
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";
import useNetwork from "../hooks/useNetwork";

function Tasks() {
  const { tasks, isPending, error, add, deleteDoc } = useTasksContext();
  const { isOnline } = useNetwork();
  const history = useHistory();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleAdd = async () => {
    if (!titulo.trim()) return;
    await add({ titulo, descripcion });
    setTitulo("");
    setDescripcion("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/contacts" />
          </IonButtons>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonText color={isOnline ? "success" : "danger"}>
          <p>{isOnline ? "Conectado" : "Sin conexión"}</p>
        </IonText>

        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={titulo}
            onIonChange={(e) => setTitulo(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonInput
            value={descripcion}
            onIonChange={(e) => setDescripcion(e.detail.value!)}
            disabled={!isOnline}
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={handleAdd}
          disabled={!isOnline || isPending}
          style={{ marginTop: "16px" }}
        >
          {isPending ? <IonSpinner name="crescent" /> : "Agregar Tarea"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {tasks.map((task: any) => (
            <IonItem key={task.id}>
              <IonLabel>
                <h2>{task.titulo}</h2>
                <p>{task.descripcion}</p>
              </IonLabel>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => deleteDoc(task.id)}
                disabled={!isOnline}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        <IonButton
          expand="block"
          fill="outline"
          onClick={() => history.push("/fruits")}
          style={{ marginTop: "16px" }}
        >
          Ir a Frutas
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

export default Tasks;