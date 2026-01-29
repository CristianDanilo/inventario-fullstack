import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos herramientas

const Registro = () => {
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const navigate = useNavigate(); // Hook para saltar de página por código

  const manejarRegistro = async () => {
    const res = await fetch('http://localhost:3000/api/auth/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: regEmail, password: regPass }),
    });
    const data = await res.json();
    alert(data.mensaje);

    if (res.ok) {
      navigate('/login'); // Si el registro es exitoso, ¡al login!
    }
  };

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center'>
      <div className='max-w-md w-full'>
        {' '}
        {/* Cambié size-110 por max-w-md que es más estándar */}
        <div className='bg-white p-8 rounded-2xl shadow-md border border-slate-200'>
          <h2 className='text-2xl font-bold mb-6 text-slate-800'>Crear Cuenta</h2>
          <input
            type='email'
            placeholder='Email'
            className='w-full p-3 mb-4 rounded-xl border outline-none focus:ring-2 focus:ring-green-500'
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Contraseña'
            className='w-full p-3 mb-6 rounded-xl border outline-none focus:ring-2 focus:ring-green-500'
            onChange={(e) => setRegPass(e.target.value)}
          />

          <button
            onClick={manejarRegistro}
            className='w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition'
          >
            Registrarse
          </button>

          <p className='mt-4 text-center text-slate-600'>
            ¿Ya tienes cuenta?{' '}
            <Link to='/login' className='text-blue-600 font-semibold'>
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
