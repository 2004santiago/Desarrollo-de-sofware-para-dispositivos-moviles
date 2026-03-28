import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonLabel,
  IonInput, IonButton, IonButtons, IonSpinner,
  IonText, IonBackButton
} from "@ionic/react";
import { useState } from "react";
import { useFruitsContext } from "../context/FruitsContext";

function Fruits() {
  const { fruits, isPending, error, add, deleteItem } = useFruitsContext();
  const [nombre, setNombre] = useState("");
  const [proveedor, setProveedor] = useState("");

  const handleAdd = async () => {
    if (!nombre.trim()) return;
    await add({ nombre, proveedor });
    setNombre("");
    setProveedor("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Frutas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonText color="success">
          <p>Disponible sin conexión</p>
        </IonText>

        <IonItem>
          <IonLabel position="floating">Nombre de la fruta</IonLabel>
          <IonInput
            value={nombre}
            placeholder="Ej: Mango"
            onIonChange={(e) => setNombre(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Proveedor</IonLabel>
          <IonInput
            value={proveedor}
            onIonChange={(e) => setProveedor(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleAdd}
          disabled={isPending}
        >
          {isPending ? <IonSpinner name="crescent" /> : "Agregar"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {fruits.map((fruit: any) => (
            <IonItem key={fruit.id}>
              <IonLabel>
                <h2>{fruit.nombre}</h2>
                <p>{fruit.proveedor}</p>
              </IonLabel>
              <IonButton
                slot="end"
                color="danger"
                onClick={() => deleteItem(fruit.id)}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
}

export default Fruits;