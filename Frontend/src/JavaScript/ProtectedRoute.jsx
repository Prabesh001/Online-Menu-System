import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ condition, passCondition ,children, failDestination }) => {
  return condition === passCondition ? children : <Navigate to={failDestination} />;
};

export default ProtectedRoute;
