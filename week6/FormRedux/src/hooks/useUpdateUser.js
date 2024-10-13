import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slice/userApiSlice";

const useUpdateUser = () => {
  const dispatch = useDispatch();

  const updateNewUser = async (user) => {
    try {
      const response = await dispatch(updateUser(user));
      return { success: true, data: response.payload };
    } catch (error) {
      console.error("Failed to update user:", error);
      return { success: false, error };
    }
  };

  return { updateNewUser };
};

export default useUpdateUser;
