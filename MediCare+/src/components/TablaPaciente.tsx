import { useState } from "react";
import type { Paciente } from "./Dashboard.tsx";

interface Props {
  pacientes: Paciente[];
  onEditar: (paciente: Paciente) => void;
  onEliminar: (id: number) => void;
}
function TablaPacientes({ pacientes, onEditar, onEliminar }: Props) {
  const [idAEliminar, setIdAEliminar] = useState<number | null>(null);
  return (
    <section>
      <h3>Pacientes</h3>
      <table border={1} cellPadding={8} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombre} {paciente.apellido}</td>
              <td>{paciente.dni}</td>
              <td>{paciente.telefono}</td>
              <td>
                <button onClick={() => onEditar(paciente)}>Editar</button>
                {" "}
                <button onClick={() => setIdAEliminar(paciente.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {idAEliminar !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
            <p>¿Seguro que deseas eliminar este paciente?</p>
            <button
              onClick={() => {
                onEliminar(idAEliminar);
                setIdAEliminar(null);
              }}>
              Sí, eliminar
            </button>
            {" "}
            <button onClick={() => setIdAEliminar(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TablaPacientes;