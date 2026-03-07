import { useEffect, useState } from "react";
import type { Usuario } from "../App.tsx";
import FormularioPaciente from "./FormularioPaciente.tsx";
import TablaPacientes from "./TablaPaciente.tsx";



export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
}
interface Props {
  usuario: Usuario;
}
function Dashboard({ usuario }: Props) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteAEditar, setPacienteAEditar] = useState<Paciente | null>(null);
  const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    const guardados = localStorage.getItem("medicare_pacientes");
    if (guardados) {
      setPacientes(JSON.parse(guardados));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("medicare_pacientes", JSON.stringify(pacientes));
  }, [pacientes]);
  const guardarPaciente = (paciente: Paciente) => {
    if (pacienteAEditar) {
      const actualizados = pacientes.map((p) =>
        p.id === paciente.id ? paciente : p
      );
      setPacientes(actualizados);
      setPacienteAEditar(null);
      return;
    }
    setPacientes([
      ...pacientes,
      {
        ...paciente,
        id: Date.now(),
      },
    ]);
  };
  const eliminarPaciente = (id: number) => {
    const filtrados = pacientes.filter((p) => p.id !== id);
    setPacientes(filtrados);
  };
  const pacientesFiltrados = pacientes.filter((p) => {
    const texto = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto) ||
      p.dni.toLowerCase().includes(texto)
    );
  });

  return (
    <main style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <p>
        Usuario activo: {usuario.nombre} {usuario.apellido} - {usuario.rol}
      </p>
      {usuario.rol !== "recepcionista" && (
        <section style={{ marginBottom: 24, padding: 12, border: "1px solid #ccc" }}>
          <h3>Estadísticas</h3>
          <p>Total pacientes: {pacientes.length}</p>
        </section>
      )}
      {usuario.rol !== "medico" && (
        <FormularioPaciente
          pacienteAEditar={pacienteAEditar}
          onGuardar={guardarPaciente}
        />
      )}
      <section style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "100%", padding: 8 }}/>
      </section>
      <TablaPacientes
        pacientes={pacientesFiltrados}
        onEditar={setPacienteAEditar}
        onEliminar={eliminarPaciente}/>
    </main>
  );
}

export default Dashboard;