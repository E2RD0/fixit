import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const PrivateRoute: React.FC = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
