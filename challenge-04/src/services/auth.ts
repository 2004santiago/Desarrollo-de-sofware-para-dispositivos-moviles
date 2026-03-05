const LOGGED_KEY = "logged";

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(LOGGED_KEY) === "true";
};

export const login = (email: string, password: string): boolean => {
  // Credenciales del PDF
  const ok = email === "user@mail.com" && password === "123";
  if (ok) localStorage.setItem(LOGGED_KEY, "true"); // token logged=true :contentReference[oaicite:6]{index=6}
  return ok;
};

export const logout = () => {
  localStorage.removeItem(LOGGED_KEY); // limpiar token :contentReference[oaicite:7]{index=7}
};