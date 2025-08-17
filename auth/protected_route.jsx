// src/components/context/protected_route.jsx
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  if (!token || token === "undefined") {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
