import { createContext, useState, useContext } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    return result.user;
  };
  const register = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    return result.user;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('logged');
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);