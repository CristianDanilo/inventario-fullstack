import { useCart } from '../context/CartContext';

const ProductoCard = ({ producto }) => {
  const { addToCart } = useCart();

  // Desestructuramos para que el código sea más legible
  const { id, nombre, precio, imagen, descripcion, origen, categoria, stock } = producto;

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-stone-200 group'>
      {/* Imagen con badge de categoría */}
      <div className='relative h-64 overflow-hidden'>
        <img
          src={`http://localhost:3000/uploads/${imagen}`}
          alt={nombre}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
        <span className='absolute top-4 right-4 bg-amber-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
          {categoria}
        </span>
      </div>

      {/* Contenido de la card */}
      <div className='p-6'>
        <div className='flex justify-between items-start mb-2'>
          <h2 className='text-xl font-bold text-stone-800'>{nombre}</h2>
          <span className='text-amber-700 font-bold text-lg'>${precio}</span>
        </div>

        <p className='text-stone-500 text-sm mb-4 line-clamp-2'>{descripcion}</p>

        <div className='flex items-center gap-2 text-xs text-stone-400 mb-6'>
          <span className='bg-stone-100 px-2 rounded'>{origen}</span>
          <span className={`px-2 py-1 rounded ${stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {stock > 0 ? `${stock} disponibles` : 'Agotado'}
          </span>
        </div>

        <button
          disabled={stock <= 0}
          onClick={() => addToCart(producto)}
          className={`w-full py-3 rounded-xl font-bold transition-colors ${
            stock > 0 ? 'bg-amber-800 text-white hover:bg-amber-900' : 'bg-stone-200 text-stone-400 cursor-not-allowed'
          }`}
        >
          {stock > 0 ? 'Agregar al carrito' : 'Sin existencias'}
        </button>
      </div>
    </div>
  );
};

export default ProductoCard;
