import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importante para la navegación SPA
import { useNavigate } from 'react-router-dom';


const Login = ({ setToken }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async () => {
    if (!loginEmail || !loginPass) {
      return alert('Por favor rellena todos los campos');
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token); // Esto activa el cambio de pantalla en App.jsx
        navigate('/dashboard');
      }else{
        alert('X' + (data.mensaje || 'Error al entrar'))
      }
      
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
      <div className='max-w-md w-full'>
        <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-200'>
          <h2 className='text-2xl font-bold mb-8 text-slate-800'>Iniciar Sesión</h2>
          <input
            type='email'
            placeholder='Email'
            className='w-full p-3 mb-4 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Contraseña'
            className='w-full p-3 mb-6 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500'
            onChange={(e) => setLoginPass(e.target.value)}
          />

          <button
            onClick={manejarLogin}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition'
          >
            Entrar
          </button>

          <div className='flex flex-col gap-3 mt-6 text-sm text-center font-medium'>
            <Link to='/registro' className='text-blue-600 hover:underline'>
              ¿No tienes cuenta? Crea una aquí
            </Link>
            <a href='#' className='text-slate-400'>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
