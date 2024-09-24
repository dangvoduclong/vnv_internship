import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
const PublicRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
