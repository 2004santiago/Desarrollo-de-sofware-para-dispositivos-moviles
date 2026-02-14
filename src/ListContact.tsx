type Contacto = {
  id: number;
  nombre: string;
  telefono: string;
};

type Props = {
  contactos: Contacto[];
  onEliminar: (id: number) => void;
};

export default function ListContact({ contactos, onEliminar }: Props) {
  return (
    <ol>
      {contactos.map((c) => (
        <li key={c.id}>
          {c.nombre} - {c.telefono}{" "}
          <button onClick={() => onEliminar(c.id)}>X</button>
        </li>
      ))}
    </ol>
  );
}

