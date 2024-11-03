import React from "react";
import { Link, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
// import { useAuth } from "./auth-context";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={(props: any) =>
        authToken ? <Component {...props} /> : <Link to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
