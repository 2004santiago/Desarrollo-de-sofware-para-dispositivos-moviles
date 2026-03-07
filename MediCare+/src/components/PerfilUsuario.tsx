import type { Usuario } from "../App";

interface Props {
  usuario: Usuario;
  onActualizarAvatar: (avatar: string) => void;
}

function PerfilUsuario({ usuario, onActualizarAvatar }: Props) {
  const iniciales = `${usuario.nombre[0] ?? ""}${usuario.apellido[0] ?? ""}`.toUpperCase();

  const manejarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onActualizarAvatar(reader.result);
      }
    };
    reader.readAsDataURL(archivo);
  };

  return (
    <section style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
      <h3>Perfil de usuario</h3>

      {usuario.avatar ? (
        <img
          src={usuario.avatar}
          alt="avatar perfil"
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "#2D6A9F",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          {iniciales}
        </div>
      )}

      <p>
        {usuario.nombre} {usuario.apellido}
      </p>
      <p>{usuario.email}</p>

      <input type="file" accept="image/*" onChange={manejarArchivo} />
    </section>
  );
}

export default PerfilUsuario;