import React, { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import RegisterPage from './pages/RegisterPage/RegisterPage';


function App() {
const [token,setToken]=useState<string|null>(localStorage.getItem('token'))
  return (
    <Router>
    {
      !token?
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
    </Routes>
    :
    <Routes>
      <Route  Component={Dashboard} />
      <Route  path='/dashboard/*' Component={Dashboard} />
    </Routes>
    
    }

    </Router>
  )
}

export default App;
