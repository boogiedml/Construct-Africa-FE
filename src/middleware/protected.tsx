import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";
import type { ReactNode } from "react";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("access_token");

  if (!token || isTokenExpired(token)) {
    toast.error('Token has expired or is invalid, please login again')
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
