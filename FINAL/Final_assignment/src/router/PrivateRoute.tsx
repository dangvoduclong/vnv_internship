import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/account/admins" />;
};

export default PrivateRoute;
