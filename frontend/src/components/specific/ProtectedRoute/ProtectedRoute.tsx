import React, { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";

const ProtectedRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  console.log(rest);
  useEffect(() => {
    console.log(rest.path);
    if (rest.path != "/dashboard/") window.location.href = "/dashboard/";
  });
  return (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  );
};

export default ProtectedRoute;
