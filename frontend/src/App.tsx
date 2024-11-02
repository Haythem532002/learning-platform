import { useState } from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
// import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [first, setfirst] = useState(false);
  return (
    <Router>
      {!first ? (
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      ) : (
        <Routes>
          <Route Component={Dashboard} />
          <Route path="/" Component={Dashboard} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
