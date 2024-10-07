import UserForm from "../../components/form/UserForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/slice/userSlice";
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const onUpdate = (data) => {
    const updatedUserData = { ...userData, ...data };
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, ...updatedUserData })
    );
    dispatch(setUserData(updatedUserData));
    toast.success("Information updated successfully");
    navigate("/information");
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <UserForm onSubmit={onUpdate} initialValues={userData} />
    </section>
  );
};

export default Dashboard;
