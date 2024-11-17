import React, { useEffect } from "react";
import { useAuth } from "../../../services/auth/AuthContext";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../../../pages/LoginPage/LoginPage";
import RegisterPage from "../../../pages/RegisterPage/RegisterPage";

interface np {
  path: String;
}

const Rerouter = (props: np) => {
  const path = props.path;
  const auth = useAuth().authToken;
  useEffect(() => {
    console.log(path);
    console.log("chaged path");
  }, []);
  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/dashboard/*" Component={Dashboard} />
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};
export default Rerouter;
