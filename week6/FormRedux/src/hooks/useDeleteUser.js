import { useDispatch } from "react-redux";
import { deleteUser } from "../redux/slice/userApiSlice";

const useDeleteUser = () => {
  const dispatch = useDispatch();
  const deleteNewUser = async (user) => {
    try {
      const response = await dispatch(deleteUser(user));
      return { success: true, data: response.payload };
    } catch (error) {
      console.error("Failed to delete user:", error);
      return { success: false, error };
    }
  };
  return { deleteNewUser };
};

export default useDeleteUser;
