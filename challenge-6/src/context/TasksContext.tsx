import { createContext, useContext } from "react";
import useRealTimeCollection from "../hooks/useRealTimeCollection";

const TasksContext = createContext<any>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { results, isPending, error, getAll, add, update, deleteDoc } =
    useRealTimeCollection("tareas");

  return (
    <TasksContext.Provider
      value={{ tasks: results, isPending, error, getAll, add, update, deleteDoc }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}