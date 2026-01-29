import { useEffect, useState } from 'react';

const Dashboard = ({ token, setToken }) => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [editarId, setEditarId] = useState(null);

  const traerProductos = async () => {
    const res = await fetch('http://localhost:3000/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const guardarProducto = async () => {
    if (!nombre || precio <= 0) return alert('Llenar los campos');
    const url = editarId ? `http://localhost:3000/api/productos/${editarId}` : 'http://localhost:3000/api/productos';
    const metodo = editarId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, precio }),
    });

    if (res.ok) {
      setNombre('');
      setPrecio(0);
      setEditarId(null);
      traerProductos();
    }
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    traerProductos();
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    traerProductos();
  }, []);

  return (
    <div className='p-10 bg-slate-50 min-h-screen'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex justify-between items-center mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-200'>
          <h1 className='text-2xl font-bold text-slate-800'>📦 StockMaster</h1>
          <button
            onClick={cerrarSesion}
            className='bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold hover:bg-red-200 transition'
          >
            Cerrar Sesión
          </button>
        </nav>

        {/* Formulario y Tabla (Aquí pegas el diseño de Tailwind que hicimos antes) */}
        <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8'>
          <div className='flex gap-4'>
            <input
              className='flex-1 p-3 border rounded-xl'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder='Nombre'
            />
            <input
              className='w-32 p-3 border rounded-xl'
              type='number'
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <button onClick={guardarProducto} className='bg-blue-600 text-white px-6 py-3 rounded-xl font-bold'>
              {editarId ? 'Actualizar' : 'Añadir'}
            </button>
          </div>
        </div>

        {/* Tabla simplificada por espacio */}
        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
          <table className='w-full text-left'>
            <thead className='bg-slate-50'>
              <tr>
                <th className='p-4'>Producto</th>
                <th className='p-4'>Precio</th>
                <th className='p-4 text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className='border-t border-slate-100'>
                  <td className='p-4 font-semibold'>{p.nombre}</td>
                  <td className='p-4 text-green-600'>${p.precio}</td>
                  <td className='p-4 text-center'>
                    <button
                      onClick={() => {
                        setEditarId(p.id);
                        setNombre(p.nombre);
                        setPrecio(p.precio);
                      }}
                      className='mr-2'
                    >
                      ✏️
                    </button>
                    <button onClick={() => eliminarProducto(p.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
