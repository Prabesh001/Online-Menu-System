import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, passCondition ,children, destination }) => {
  return condition === passCondition ? children : <Navigate to={destination} />;
};

export default ProtectedRoute;
