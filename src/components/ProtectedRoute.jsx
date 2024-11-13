import { Navigate } from "react-router-dom";
import React from "react";

function ProtectedRoute({ element: Element, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/not-authorized" />;
  
  return <Element />;
}

export default ProtectedRoute;
