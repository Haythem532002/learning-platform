import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return (
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  );
};

export default ProtectedRoute;
