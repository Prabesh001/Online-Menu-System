import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated === true ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
