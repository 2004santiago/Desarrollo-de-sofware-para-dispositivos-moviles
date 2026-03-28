import { useState, useEffect } from "react";
import {
  ref,
  push,
  set,
  remove,
  onValue,
  get
} from "firebase/database";
import { rtdb } from "../firebase/db";

const useRealTimeCollection = (table: string) => {
  const [results, setResults] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<any>(null);

  // --- Tiempo real ---
  useEffect(() => {
    setIsPending(true);
    const dbRef = ref(rtdb, table);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]) => ({
            id,
            ...(value as any)
          }));
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [table]);

  // --- Obtener ---
  const getAll = async () => {
    setIsPending(true);
    setError(null);

    try {
      const snapshot = await get(ref(rtdb, table));
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([id, value]) => ({
          id,
          ...(value as any)
        }));
        setResults(data);
        setIsPending(false);
        return data;
      }
      setIsPending(false);
      return [];
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
      const newRef = await push(ref(rtdb, table), {
        ...data,
        createdAt: new Date().toISOString()
      });
      setIsPending(false);
      return newRef;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  // --- Actualizar ---
  const update = async (id: string, data: any) => {
    setIsPending(true);
    setError(null);

    try {
      await set(ref(rtdb, `${table}/${id}`), {
        ...data,
        updatedAt: new Date().toISOString()
      });
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  // --- Eliminar ---
  const deleteDoc = async (id: string) => {
    setIsPending(true);
    setError(null);

    try {
      await remove(ref(rtdb, `${table}/${id}`));
      setIsPending(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { results, isPending, error, getAll, add, update, deleteDoc };
};

export default useRealTimeCollection;
