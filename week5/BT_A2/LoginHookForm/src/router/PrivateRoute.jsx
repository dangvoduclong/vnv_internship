import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
