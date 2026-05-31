import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const userEmail =
    localStorage.getItem("userEmail");

  // if not logged in redirect to home/login
  if (!userEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;