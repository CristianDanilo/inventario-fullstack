import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login';
import Registro from './pages/Registro'
import Dashboard from './pages/Dashboard';
import TiendaPublica from './pages/TiendaPublica'
import { CartProvider } from './context/CartContext';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    // Si el token cambia en el estado, lo actualizamos en el almacenamiento
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Ruta para el cliente final */}
          <Route path='/' element={<TiendaPublica />} />
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
    </CartProvider>
  );
}

export default App
