import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonBackButton, IonBadge, IonAlert } from "@ionic/react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const { getTaskById, deleteTask } = useTasksContext();
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const task = getTaskById(Number(id));

  if (!task) {
    history.push("/tasks");
    return null;
  }

  const handleDelete = () => {
    deleteTask(task.id);
    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>{task.title}</h2>

        <IonBadge color={task.done ? "success" : "warning"}>
          {task.done ? "Completada" : "Pendiente"}
        </IonBadge>

        <p style={{ marginTop: "16px" }}>{task.description}</p>

        <IonButton
          expand="block"
          onClick={() => history.push(`/tasks/edit/${task.id}`)}
          style={{ marginTop: "24px" }}
        >
          Editar Tarea
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={() => setShowAlert(true)}
          style={{ marginTop: "8px" }}
        >
          Eliminar Tarea
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="¿Eliminar tarea?"
          message="Esta acción no se puede deshacer."
          buttons={[
            {
              text: "Cancelar",
              role: "cancel"
            },
            {
              text: "Eliminar",
              role: "confirm",
              handler: handleDelete
            }
          ]}
        />

      </IonContent>
    </IonPage>
  );
}

export default TaskDetail;
