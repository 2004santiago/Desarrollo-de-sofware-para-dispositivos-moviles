import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/dexie";

const useDexie = (table: string, filterFn: any = null) => {
  const [manualResults, setManualResults] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);

  // --- Tiempo real ---
  const liveResults = useLiveQuery(() => {
    if (filterFn) {
      return (db as any)[table].filter(filterFn).toArray();
    }
    return (db as any)[table].toArray();
  }, [table]) ?? [];

  // --- Lectura manual ---
  const getAll = async () => {
    setIsPending(true);
    setError(null);

    try {
      let data;
      if (filterFn) {
        data = await (db as any)[table].filter(filterFn).toArray();
      } else {
        data = await (db as any)[table].toArray();
      }
      setManualResults(data);
      setIsPending(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return [];
    }
  };

  // --- Agregar ---
  const add = async (data: any) => {
    setIsPending(true);
    setError(null);

    try {
      await (db as any)[table].add({
        ...data,
        createdAt: new Date().toISOString()
      });
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  // --- Actualizar ---
  const update = async (id: number, data: any) => {
    setIsPending(true);
    setError(null);

    try {
      await (db as any)[table].update(id, data);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  // --- Eliminar ---
  const deleteItem = async (id: number) => {
    setIsPending(true);
    setError(null);

    try {
      await (db as any)[table].delete(id);
      setIsPending(false);
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { results: liveResults, manualResults, isPending, error, getAll, add, update, deleteItem };
};

export default useDexie;