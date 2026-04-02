import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons, IonBackButton,
  IonText, IonItem, IonLabel
} from "@ionic/react";
import { useState } from "react";
import { useFilesystem } from "../hooks/useFilesystem";

function FilesystemPage() {
  const { writeFile, readFile, deleteFile, listFiles, loading } = useFilesystem();
  const [fileContent, setFileContent] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);

  const handleWrite = async () => {
    await writeFile({
      path: "mi-data.json",
      data: { nombre: "Challenge 07", curso: "Ionic", fecha: new Date().toISOString() }
    });
    alert("Archivo guardado");
  };

  const handleRead = async () => {
    const data = await readFile({ path: "mi-data.json" });
    setFileContent(data);
  };

  const handleList = async () => {
    const result = await listFiles({});
    setFiles(result);
  };

  const handleDelete = async () => {
    await deleteFile({ path: "mi-data.json" });
    setFileContent(null);
    alert("Archivo eliminado");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Filesystem</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleWrite} disabled={loading}>
          Escribir archivo
        </IonButton>
        <IonButton expand="block" onClick={handleRead} disabled={loading}>
          Leer archivo
        </IonButton>
        <IonButton expand="block" onClick={handleList} disabled={loading}>
          Listar archivos
        </IonButton>
        <IonButton expand="block" color="danger" onClick={handleDelete} disabled={loading}>
          Eliminar archivo
        </IonButton>

        {fileContent && (
          <>
            <h3>Contenido del archivo:</h3>
            <IonItem><IonLabel>Nombre: {fileContent.nombre}</IonLabel></IonItem>
            <IonItem><IonLabel>Curso: {fileContent.curso}</IonLabel></IonItem>
            <IonItem><IonLabel>Fecha: {fileContent.fecha}</IonLabel></IonItem>
          </>
        )}

        {files.length > 0 && (
          <>
            <h3>Archivos:</h3>
            {files.map((file: any, i) => (
              <IonItem key={i}>
                <IonLabel>{file.name}</IonLabel>
              </IonItem>
            ))}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default FilesystemPage;