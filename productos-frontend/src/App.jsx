import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login';
import Registro from './pages/Registro'
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <Router>
      <Routes>
        {/* Ruta 1: Inicio de Sesión */}
        <Route path='/login' element={<Login setToken={setToken} />} />
        {/* Ruta 2: Crear Cuenta */}
        <Route path='/registro' element={<Registro />} />
        {/* Ruta 3: Dashboard(Protegida) */}
        <Route
          path='/dashboard'
          element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to='/login' />}
        />
        {/* Redirigir por defecto al login si no conoce la ruta */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  );
}

export default App
