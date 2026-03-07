import { useState } from "react";

interface Props {
  onLogin: (email: string, password: string) => boolean;
}

function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ok = onLogin(email, password);

    if (!ok) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    setError("");
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>MediCare+ Admin</h1>

      <form onSubmit={manejarSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: 12 }}>
            {error}
          </p>
        )}

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;