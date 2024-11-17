import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { AuthProvider, useAuth } from "./services/auth/AuthContext";
import ProtectedRoute from "./components/specific/ProtectedRoute/ProtectedRoute";
import Rerouter from "./components/specific/Rerouter/Rerouter";
import { useEffect } from "react";

// {auth ? (
//   <Routes>
//     <Route path="/dashboard/*" Component={Dashboard} />
//   </Routes>
// ) : (
//   <Routes>
//     <Route path="/login" Component={LoginPage} />
//     <Route path="/register" Component={RegisterPage} />
//   </Routes>
// )}
function App() {
  const location = window.location;
  return (
    <Router>
      <Rerouter path={location.pathname} />
    </Router>
  );
}

export default App;
