import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login';
import Registro from './pages/Registro'
import Dashboard from './pages/Dashboard';
import TiendaPublica from './pages/TiendaPublica'
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <CartProvider>
      <Router>
        <Navbar token={token} setToken={setToken} />
        <Routes>
          <Route path='/' element={<TiendaPublica token={token} />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/registro' element={<Registro />} />

          {/* Ruta Protegida para Admin */}
          <Route
            path='/dashboard'
            element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to='/login' />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App
