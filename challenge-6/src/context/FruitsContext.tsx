import { createContext, useContext } from "react";
import useDexie from "../hooks/useDexie";

const FruitsContext = createContext<any>(null);

export function FruitsProvider({ children }: { children: React.ReactNode }) {
  const { results, isPending, error, getAll, add, update, deleteItem } =
    useDexie("frutas");

  return (
    <FruitsContext.Provider
      value={{ fruits: results, isPending, error, getAll, add, update, deleteItem }}
    >
      {children}
    </FruitsContext.Provider>
  );
}

export function useFruitsContext() {
  return useContext(FruitsContext);
}