import { useFormContext } from "react-hook-form";
import UserForm from "../../components/form/UserForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/slice/userSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reset } = useFormContext();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const onUpdate = (data) => {
    const updatedUserData = { ...userData, ...data };
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...userData, ...updatedUserData })
    );
    dispatch(setUserData(updatedUserData));
    navigate("/information");
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <UserForm onSubmit={onUpdate} />
    </section>
  );
};

export default Dashboard;
