import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  // Decodificamos el token para saber el rol (opcional, o puedes pasar el rol como prop)
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='bg-amber-950 text-stone-100 p-4 shadow-md flex justify-between items-center px-8'>
      <Link to='/' className='text-2xl font-serif font-bold tracking-tighter hover:text-amber-500 transition'>
        ☕ Aroma & Grano
      </Link>

      <div className='flex gap-6 items-center'>
        <Link to='/' className='hover:text-amber-400'>
          Tienda
        </Link>

        {token ? (
          <>
            {/* Si hay token, mostramos el botón de Dashboard (si es admin) y Cerrar Sesión */}
            <Link to='/dashboard' className='bg-amber-800 px-4 py-2 rounded-lg text-sm hover:bg-amber-700'>
              Panel Admin
            </Link>
            <button onClick={handleLogout} className='text-stone-400 hover:text-white text-sm underline'>
              Salir
            </button>
          </>
        ) : (
          /* Si no hay token, mostramos Login */
          <Link
            to='/login'
            className='border border-amber-500 px-4 py-2 rounded-lg text-sm hover:bg-amber-500 hover:text-white transition'
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
