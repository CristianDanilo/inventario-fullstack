import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose, finalizarCompra }) => {
  const { cart, totalPrice, removeFromCart, addToCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex justify-end'>
      {/* Fondo oscuro detrás */}
      <div className='fixed inset-0 bg-black/50' onClick={onClose}></div>

      {/* Panel blanco lateral */}
      <div className='relative w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-stone-800'>Tu Pedido ☕</h2>
          <button onClick={onClose} className='text-stone-400 hover:text-stone-600 text-2xl'>
            &times;
          </button>
        </div>

        {/* Lista de productos */}
        <div className='flex-1 overflow-y-auto'>
          {cart.length === 0 ? (
            <p className='text-center text-stone-400 mt-10'>Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className='flex gap-4 mb-4 border-b pb-4'>
                <img
                  src={`http://localhost:3000/uploads/${item.imagen}`}
                  className='w-16 h-16 object-cover rounded-lg'
                />
                <div className='flex-1'>
                  <h3 className='font-bold text-stone-700'>{item.nombre}</h3>
                  <p className='text-sm text-stone-500'>
                    ${item.precio} x {item.cantidad}
                  </p>
                  <p className='text-amber-800 font-semibold italic'>${item.precio * item.cantidad}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className='text-red-400 text-sm'>
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total y Botón de Pago */}
        <div className='border-t pt-6 mt-4'>
          <div className='flex justify-between text-xl font-bold text-stone-800 mb-6'>
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          <button
            onClick={finalizarCompra}
            disabled={cart.length === 0}
            className='w-full bg-amber-800 text-white py-4 rounded-xl font-bold hover:bg-amber-900 transition disabled:bg-stone-300'
          >
            CONFIRMAR Y PAGAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
