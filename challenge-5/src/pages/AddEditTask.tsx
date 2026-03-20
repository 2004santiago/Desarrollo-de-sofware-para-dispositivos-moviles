import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton, IonToggle } from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTasksContext } from "../context/TasksContext";

function AddEditTask() {
  const { id } = useParams<{ id: string }>();
  const { addTask, editTask, getTaskById } = useTasksContext();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  const isEditing = !!id;

  useEffect(() => {
    if (isEditing) {
      const task = getTaskById(Number(id));
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setDone(task.done);
      }
    }
  }, [id]);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("El título es obligatorio");
      return;
    }

    if (isEditing) {
      editTask(Number(id), { title, description, done });
    } else {
      addTask({ title, description });
    }

    history.push("/tasks");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{isEditing ? "Editar Tarea" : "Nueva Tarea"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput
            value={title}
            onIonChange={(e) => setTitle(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Descripción</IonLabel>
          <IonTextarea
            value={description}
            onIonChange={(e) => setDescription(e.detail.value!)}
            rows={4}
          />
        </IonItem>

        {isEditing && (
          <IonItem>
            <IonLabel>¿Tarea completada?</IonLabel>
            <IonToggle
              checked={done}
              onIonChange={(e) => setDone(e.detail.checked)}
            />
          </IonItem>
        )}

        <IonButton
          expand="block"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          {isEditing ? "Guardar cambios" : "Crear tarea"}
        </IonButton>

      </IonContent>
    </IonPage>
  );
}

export default AddEditTask;
