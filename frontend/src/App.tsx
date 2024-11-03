import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { AuthProvider } from "./services/auth/AuthContext";
import ProtectedRoute from "./components/specific/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      
      <Router>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
        <Routes>
          <Route Component={Dashboard} />
          <ProtectedRoute path="/dashboard/*" Component={Dashboard} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
