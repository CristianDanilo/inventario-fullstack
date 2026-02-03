import { useEffect, useState } from 'react';

const Dashboard = ({ token, setToken }) => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [editarId, setEditarId] = useState(null);
  const rol = localStorage.getItem('rol');
const [archivo, setArchivo] = useState(null);
const [preview, setPreview] = useState(null);


  const traerProductos = async () => {
    const res = await fetch('http://localhost:3000/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const guardarProducto = async () => {
    if (!nombre || precio <= 0) return alert('Llena los campos e ingresa un valor mayor a 0 en el precio');
    // 1. Preparamos el sobre (FormData)
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);

    // Solo agregamos la imagen si el usuario seleccionó una
    if (archivo) {
      formData.append('imagen', archivo);
    }

    const url = editarId ? `http://localhost:3000/api/productos/${editarId}` : 'http://localhost:3000/api/productos';
    const metodo = editarId ? 'PUT' : 'POST'; 

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setNombre('');
      setPrecio(0);
      setArchivo(null);
      setPreview(null);
      setEditarId(null);
      traerProductos();
      alert('Producto guardado con éxito');
    } else {
      const errorData = await res.json();
      alert('Error: ' + errorData.mensaje);
    }
  };
  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    traerProductos();
  };

  const manejarCambioImagen = (e) => {
    if (e.target.files && e.target.files.length > 0){
      if(preview) URL.revokeObjectURL(preview);
      const file = e.target.files[0];
      setArchivo(file);
      const urlTemporal = URL.createObjectURL(file);
      setPreview(urlTemporal);
    } else {
      setArchivo(null);
      setPreview(null)
    }
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
        {rol === 'admin' ? (
          <div>
            <div className='bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8'>
              <div className='gap-4 grid grid-cols-2'>
                <div className='bg-white p-6 rounded-2xl shadow-sm mb-8 border border-slate-200'>
                  <input
                    type='file'
                    accept='image/*'
                    onChangeCapture={(e) => manejarCambioImagen(e)}
                    className='mb-4 block w-full text-slate-500 file:py-2 file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file-font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                  ></input>

                  {/* cuadro de previsualización */}
                  {preview && (
                    <div className='mb-4 place-items-center'>
                      <p className='text-sm text-slate-500 mr-3'>Vista Previa</p>
                      <img src={preview} alt='Previsualización' className='w-32 h-32 object-cover rounded-lg border' />
                    </div>
                  )}
                </div>
                <div className='flex flex-col'>
                  <input
                    className='p-3 m-2 border rounded-xl'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder='Nombre'
                  />
                  <input
                    className='p-3 m-2 border rounded-xl'
                    type='number'
                    value={precio}
                    placeholder='Precio'
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                  <button
                    onClick={guardarProducto}
                    className='bg-blue-600 text-white m-2 px-6 py-3 rounded-xl font-bold'
                  >
                    {editarId ? 'Actualizar' : 'Añadir'}
                  </button>
                </div>
              </div>
            </div>
            {/* Tabla simplificada por espacio */}
            <div className='bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden'>
              <table className='w-full text-left'>
                <thead className='bg-slate-50'>
                  <tr className='border-b text-slate-400 uppercase text-xs'>
                    <th className='p-4'>Imagen</th>
                    <th className='p-4'>Producto</th>
                    <th className='p-4'>Precio</th>
                    <th className='p-4 text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id} className='border-t border-slate-100'>
                      <td className='p-4'>
                        {p.imagen ? (
                          <img
                            src={`http://localhost:3000/uploads/${p.imagen}`}
                            alt='p.nombre'
                            className='w-12 h-12 rounded-lg object-cover border'
                          ></img>
                        ) : (
                          <div className='w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-400'>
                            Sin foto
                          </div>
                        )}
                      </td>
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
        ) : (
          <div className='bg-blue-50 p-4 rounded-xl mb-8 text-blue-700'>
            👋 Bienvenido al Catálogo. Solo puedes visualizar los productos.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
