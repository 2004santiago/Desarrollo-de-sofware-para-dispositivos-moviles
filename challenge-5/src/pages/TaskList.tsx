import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonButtons, IonIcon ,IonBadge} from "@ionic/react";
import { addOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";
import { useAuthContext } from "../context/AuthContext";

function TaskList() {
  const { tasks, deleteTask } = useTasksContext();
  const { user, logout } = useAuthContext();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <p>Bienvenido: {user?.email}</p>

        {tasks.length === 0 ? (
          <p>No tienes tareas aún. ¡Agrega una!</p>
        ) : (
          <IonList>
            {tasks.map((task: any) => (
              <IonItem
                key={task.id}
                routerLink={`/tasks/detail/${task.id}`}
                routerDirection="forward"
                state={{ task }}
              >
                <IonLabel>
                  <h2>{task.title}</h2>
                  <p>{task.description}</p>
                </IonLabel>
                <IonBadge slot="end" color={task.done ? "success" : "warning"}>
                  {task.done ? "Hecha" : "Pendiente"}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonButton
          expand="block"
          onClick={() => history.push("/tasks/add")}
          style={{ marginTop: "16px" }}
        >
          <IonIcon icon={addOutline} slot="start" />
          Nueva Tarea
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

export default TaskList;