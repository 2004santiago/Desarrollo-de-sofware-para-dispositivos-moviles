import { createContext, useContext, useState, useEffect } from "react";

export interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

const TasksContext = createContext<any>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "done">) => {
    const newTask: Task = {
      id: Date.now(),
      done: false,
      ...task
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: number, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getTaskById = (id: number) => {
    return tasks.find((t) => t.id === id);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, getTaskById }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}