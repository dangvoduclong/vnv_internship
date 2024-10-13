import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { fetchUsers } from "../redux/slice/userApiSlice";

const useFetchUsers = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUsers());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    error,
  };
};

export default useFetchUsers;
