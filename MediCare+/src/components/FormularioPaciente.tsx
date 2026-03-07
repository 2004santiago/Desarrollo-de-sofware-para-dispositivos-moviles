import { useEffect, useState } from "react";
import type { Paciente } from "./Dashboard";

interface Props {
  pacienteAEditar: Paciente | null;
  onGuardar: (paciente: Paciente) => void;
}

function FormularioPaciente({ pacienteAEditar, onGuardar }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre);
      setApellido(pacienteAEditar.apellido);
      setDni(pacienteAEditar.dni);
      setTelefono(pacienteAEditar.telefono);
    } else {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }
  }, [pacienteAEditar]);
  const validar = () => {
    if (!nombre.trim() || !apellido.trim() || !dni.trim()) {
      return "Nombre, apellido y DNI son obligatorios";
    }
    const soloNumeros = /^\d+$/.test(dni);
    if (!soloNumeros || dni.length < 7 || dni.length > 8) {
      return "El DNI debe tener entre 7 y 8 caracteres numéricos";
    }
    return "";
  };
  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensajeError = validar();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    setError("");
    onGuardar({
      id: pacienteAEditar ? pacienteAEditar.id : 0,
      nombre,
      apellido,
      dni,
      telefono,
    });

    if (!pacienteAEditar) {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }
  };
  return (
    <section style={{ marginBottom: 24 }}>
      <h3>{pacienteAEditar ? "Editar paciente" : "Alta de paciente"}</h3>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}/>
        <br /><br />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}/>
        <br/><br/>
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}/>
        <br/><br/>
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}/>
        <br/><br/>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">
          {pacienteAEditar ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </section>
  );
}

export default FormularioPaciente;