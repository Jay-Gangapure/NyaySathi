import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Layout } from "./Layout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  withLayout?: boolean;
}

export function ProtectedRoute({ children, withLayout = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;

  if (!isAuthenticated) {
    return <Navigate to="/restricted" state={{ from: location }} replace />;
  }

  if (withLayout) {
    return <Layout>{children}</Layout>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;