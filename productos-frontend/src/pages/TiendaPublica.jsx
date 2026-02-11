import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { useCart } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer'; 
import ProductoCard from '../components/ProductoCard';


const TiendaPublica = ({token}) => {
  const [productos, setProductos] = useState([]);
  const { totalItems, cart, totalPrice, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const finalizarCompra = async () => {
    // 1. Validaciones previas
    if (!token) return alert('Debes iniciar sesión para comprar');
    if (cart.length === 0) return alert('Tu carrito está vacío');

    try {
      // 2. Definimos 'res' dentro de la función
      const res = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          total: totalPrice,
          productos: cart,
        }),
      });

      // 3. El IF debe estar AQUÍ ADENTRO, donde 'res' todavía vive
      if (res.ok) {
        alert('¡Gracias por tu compra de café!');
        clearCart();
      } else {
        const errorData = await res.json();
        alert('Error: ' + errorData.mensaje);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      alert('Hubo un problema con la conexión al servidor');
    }
  };

  return (
    <div className='min-h-screen bg-stone-50'>
      <main className='max-w-7xl mx-auto p-8'>
        {/* Botón del Carrito */}
        <div onClick={() => setIsCartOpen(true)} className='fixed bottom-10 right-10 ...'>
          🛒 <span>{totalItems}</span>
        </div>

        {/* Panel lateral */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} finalizarCompra={finalizarCompra} />

        {/* Listado de productos usando un componente pequeño */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {productos.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </main>
    </div>
  );
};
export default TiendaPublica