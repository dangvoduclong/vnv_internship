import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
