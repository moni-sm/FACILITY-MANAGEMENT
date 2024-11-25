import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAdmin }) => {
  // Get authToken and userRole from localStorage
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  // If no authToken (not logged in) or user is not an admin and we require an admin, redirect to login
  if (!authToken || (isAdmin && userRole !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  // If authorized, render the children components (protected routes)
  return element;
};

export default PrivateRoute;
