import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import {useCart } from '../context/CartContext';

const TiendaPublica = () => {
    const [productos, setProductos] = useState([]);
    const {addToCart, totalItems } = useCart();

    useEffect(() => {
        fetch('http://localhost:3000/api/productos')
        .then(res => res.json())
        .then(data => setProductos(data));
    }, []);

    return (
      <div className='min-h-screen bg-stone-50'>
        <header className='bg-amber-900 text-stone-100 py-12 px-6 text-center shadow-lg'>
          <h1 className='text-4xl md:text-6xl font-stone-100 font-bold mb-4'>Aroma y Grano</h1>
          <p className='text-amber-200 text-lg italic'>El mejor café colombiano</p>
        </header>
        <main className='max-w-7xl mx-auto p-8'>
          <div className='fixed bottom-10 right-10 bg-amber-900 text-white p-4 rounded-full shadow-2xl z-50 cursor-pointer hover:scale-110 transition'>
            🛒<span className="font-bold ml-2">{totalItems}</span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {productos.map((p) => (
              <div
                key={p.id}
                className='bg-white rounded-2xl overflow-hidden shadow-md hover:shodow-xl transition-shadow border border-stone-200 group'
              >
                {/* Imagen con badge de categoría */}
                <div className='relative h-64 overflow-hidden'>
                  <img
                    src={`http://localhost:3000/uploads/${p.imagen}`}
                    alt={p.nombre}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <span className='absolute top-4 right-4 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
                    {p.categoria}
                  </span>
                </div>
                {/* contenido de la card */}
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-2'>
                    <h2 className='text-xl font-bold text-stone-800'>{p.nombre}</h2>
                    <span className='text-amber-700 font-bold text-lg'>${p.precio}</span>
                  </div>
                  <p className='text-stone-500 text-sm mb-4 line-clamp-2'>{p.descripcion}</p>
                  <div className='flex items-center gap-2 text-xs text-stone-400 mb-6'>
                    <span className='bg-stone-100 px-2 rounded'>{p.origen}</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {p.stock > 0 ? `${p.stock} disponibles` : 'Agotado'}
                    </span>
                  </div>
                  <button
                    disabled={p.stock <= 0}
                    onClick={() => addToCart(p)}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                      p.stock > 0
                        ? 'bg-amber-800 text-white hove:bg-amber-900'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {p.stock > 0 ? 'Agregar al carrito' : 'Sin existencias'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
}
export default TiendaPublica