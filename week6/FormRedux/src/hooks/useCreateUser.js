import { useState } from "react";
import { addUser } from "../redux/slice/userApiSlice";
import { useDispatch } from "react-redux";

const useCreateUser = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addNewUser = async (user) => {
    setLoading(true);
    try {
      const response = await dispatch(addUser(user)).unwrap();
      console.log("Response:", response);

      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw new Error(err.message);
    }
  };
  return {
    loading,
    error,
    addNewUser,
  };
};

export default useCreateUser;
