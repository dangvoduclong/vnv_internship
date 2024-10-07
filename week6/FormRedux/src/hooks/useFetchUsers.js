import { useEffect, useState } from "react";
import { listUser } from "../apiServices/ListUserService";

const useFetchUsers = (limit) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listUser(limit);
        setUsers(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  return {
    users,
    loading,
    error,
  };
};

export default useFetchUsers;
