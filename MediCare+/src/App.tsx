import { useEffect,useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import LoginForm from "./components/LoginForm";
import Encabezado from "./components/Encabezado";
import Dashboard from "./components/Dashboard";
import PerfilUsuario from "./components/PerfilUsuario";



export type Rol = "recepcionista" | "medico";
export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: Rol;
  avatar?: string;
}

const CLAVE_STORAGE: Usuario[] = [
  {
    id: 1,
    nombre: "Laura",
    apellido: "Gomez",
    email: "recepcion@medicare.com",
    password: "12345",
    rol: "recepcionista",
    avatar: "/avatarRecepcionista",
  },
  {
    id: 2,
    nombre: "Felipe",
    apellido: "Ruiz",
    email: "medico@medicare.com",
    password: "12345",
    rol: "medico",
    avatar: "/avatarDoctor",
  },
];
function App() {
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null);
  const [mostrarPerfil, setVerPerfil] = useState(false);
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("medicare_usuario");
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (email: string, password: string) => {
    const encontrado = CLAVE_STORAGE.find(
      (u) => u.email === email && u.password === password
    );
    if (!encontrado) {
      return false;
    }
    const usuarioSinPassword = {
      ...encontrado,
      password: "",
    };
    setUsuarioActual(usuarioSinPassword);
    localStorage.setItem("medicare_usuario", JSON.stringify(usuarioSinPassword));
    return true;
  };
  const logout = () => {
    localStorage.removeItem("medicare_usuario");
    setUsuarioActual(null);
    setVerPerfil(false);
  };
  const actualizarAvatar = (avatar: string) => {
    if (!usuarioActual) return;

    const actualizado = {
      ...usuarioActual,
      avatar,
    };
    setUsuarioActual(actualizado);
    localStorage.setItem("medicare_usuario", JSON.stringify(actualizado));
  };
  if (!usuarioActual) {
    return <LoginForm onLogin={login} />;
  }
  return (
    <div>
      <Encabezado
        usuario={usuarioActual}
        onLogout={logout}
        onAbrirPerfil={() => setVerPerfil(!mostrarPerfil)}
      />
      {mostrarPerfil && (
        <PerfilUsuario
          usuario={usuarioActual}
          onActualizarAvatar={actualizarAvatar}
        />
      )}
      <Dashboard usuario={usuarioActual} />
    </div>
  );
}



export default App;