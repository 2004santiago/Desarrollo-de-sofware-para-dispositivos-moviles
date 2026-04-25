import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useFilesystem } from "../hooks/useFilesystem";
import { AppButton, DataCard } from "../components/ui";

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
    <PageLayout title="Filesystem">
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <AppButton onClick={handleWrite} disabled={loading}>Escribir archivo</AppButton>
          <AppButton onClick={handleRead} disabled={loading} variant="secondary">Leer archivo</AppButton>
          <AppButton onClick={handleList} disabled={loading} variant="warning">Listar archivos</AppButton>
          <AppButton onClick={handleDelete} disabled={loading} variant="danger">Eliminar archivo</AppButton>
        </div>

        {fileContent && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Contenido del archivo</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <DataCard label="Nombre" value={fileContent.nombre} />
              <DataCard label="Curso" value={fileContent.curso} />
              <DataCard label="Fecha" value={fileContent.fecha} />
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">Archivos</h3>
            {files.map((file: any, i) => (
              <DataCard key={i} label={`Archivo ${i + 1}`} value={file.name} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default FilesystemPage;
