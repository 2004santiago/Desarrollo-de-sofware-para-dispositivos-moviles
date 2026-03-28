import { createContext, useContext } from "react";
import useCollection from "../hooks/useColletion";

const ContactsContext = createContext<any>(null);

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const { results, isPending, error, getAll, add, update, remove } =
    useCollection("contactos");

  return (
    <ContactsContext.Provider
      value={{ contacts: results, isPending, error, getAll, add, update, remove }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export function useContactsContext() {
  return useContext(ContactsContext);
}