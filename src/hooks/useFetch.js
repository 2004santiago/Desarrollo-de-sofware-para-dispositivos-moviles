import { useCallback, useState } from "react";

const useFetch = (baseUrl) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const parseJson = async (response) => {
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error("La API no devolvio un JSON valido.", { cause: err });
    }
  };

  const getAll = useCallback(async () => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(baseUrl);
      const result = await parseJson(response);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  }, [baseUrl]);

  const getById = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/${id}`);
      const result = await parseJson(response);
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const post = async (newData) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const result = await parseJson(response);
      setData((prev) => [result, ...prev]);
      return result;
    } catch {
      const localPost = { ...newData, id: Date.now() };
      setData((prev) => [localPost, ...prev]);
      setError(null);
      return localPost;
    } finally {
      setIsPending(false);
    }
  };

  const put = async (id, updatedData) => {
    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const result = await parseJson(response);
      setData((prev) => prev.map((item) => (item.id === id ? result : item)));
      return result;
    } catch {
      setData((prev) =>
        prev.map((item) => (item.id === id ? updatedData : item)),
      );
      setError(null);
      return updatedData;
    } finally {
      setIsPending(false);
    }
  };

  const remove = async (id) => {
    setIsPending(true);
    setError(null);

    try {
      await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { data, isPending, error, getAll, getById, post, put, remove };
};

export default useFetch;
