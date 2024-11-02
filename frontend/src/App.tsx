import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {

  return (
    <Router>
    {
      token?
    <Routes>
      <Route path="/" Component={LoginPage} />
      <Route path="/register" Component={RegisterPage} />
    </Routes>
    :
    <Routes>
      <Route  Component={Dashboard} />
      <Route  path='/' Component={Dashboard} />
    </Routes>
    
    }

    </Router>
  )
}

export default App
