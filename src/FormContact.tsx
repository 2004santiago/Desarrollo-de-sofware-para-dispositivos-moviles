import { useState } from "react";

type Props = {
  onAgregar: (nombre: string, telefono: string) => void;
};

export default function FormContact({ onAgregar }: Props) {
  const [nombre, setNombre] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const agregar = () => {
    if (nombre.trim() === "" || telefono.trim() === "") return;
    onAgregar(nombre.trim(), telefono.trim());
    setNombre("");
    setTelefono("");
  };
  return (
    <>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Teléfono"
      />
      <button onClick={agregar}>Agregar</button>
    </>
  );
}

