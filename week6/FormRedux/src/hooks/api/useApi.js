import { useEffect, useState } from "react";

export default function useApi(handler, immediate = true) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const act = async (...args) => {
    try {
      setLoading(true);
      const result = await handler(...args);
      setData(result);
      return { result };
    } catch (err) {
      setError(err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (immediate) {
      act();
    }
  }, [immediate]);
  return { data, loading, error, act };
}
