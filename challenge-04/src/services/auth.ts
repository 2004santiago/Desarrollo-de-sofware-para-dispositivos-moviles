const LOGGED_KEY = "logged";

export const isLoggedIn = (): boolean => {
  return localStorage.getItem(LOGGED_KEY) === "true";
};

export const login = (email: string, password: string): boolean => {
  const ok = email === "user@mail.com" && password === "123";
  if (ok) localStorage.setItem(LOGGED_KEY, "true"); 
  return ok;
};

export const logout = () => {
  localStorage.removeItem(LOGGED_KEY); 
};