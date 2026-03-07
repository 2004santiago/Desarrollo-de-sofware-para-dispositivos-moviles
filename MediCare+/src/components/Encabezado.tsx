import type { Usuario } from "../App";

interface Props {
  usuario: Usuario;
  onLogout: () => void;
  onAbrirPerfil: () => void;
}

function Encabezado({ usuario, onLogout, onAbrirPerfil }: Props) {
  const iniciales = `${usuario.nombre[0] ?? ""}${usuario.apellido[0] ?? ""}`.toUpperCase();
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        background: "#0C2340",
        color: "white",
      }}>
      <div>
        <h2 style={{ margin: 0 }}>MediCare+ Admin</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onAbrirPerfil} style={{ cursor: "pointer" }}>
          {usuario.avatar ? (
            <img
              src={usuario.avatar}
              alt="avatar"
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover",
              }}/>
          ) : (
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                background: "#2D6A9F",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}>
              {iniciales}
            </div>
          )}
        </button>
        <span>{usuario.nombre} ({usuario.rol})</span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  );
}

export default Encabezado;