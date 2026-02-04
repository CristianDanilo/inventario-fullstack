import { useEffect, useState } from 'react';

const Dashboard = ({ token, setToken }) => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editarId, setEditarId] = useState(null);
  const rol = localStorage.getItem('rol');
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [origen, setOrigen] = useState('');
  const [categoria, setCategoria] = useState('Grano');
  const [stock, setStock] = useState('');


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
    formData.append('descripcion', descripcion);
    formData.append('origen', origen);
    formData.append('categoria', categoria);
    formData.append('stock', stock);
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
      limpiarFormulario();
      traerProductos();
      alert('Producto guardado con éxito');
    } else {
      const errorData = await res.json();
      alert('Error: ' + errorData.mensaje);
    }
  };
const limpiarFormulario = () => {
  setNombre('');
  setPrecio('');
  setArchivo(null);
  setPreview(null);
  setDescripcion('');
  setOrigen('');
  setCategoria('Grano');
  setStock('');
  setEditarId(null);
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
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder='Nombre'
                  />

                  <input
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
                    value={origen}
                    placeholder='Origen'
                    onChange={(e) => setOrigen(e.target.value)}
                  />
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
                  >
                    <option value='Grano'>Grano</option>
                    <option value='Molido'>Molido</option>
                    <option value='Capsulas'>Cápsulas</option>
                    <option value='Accesorios'>Accesorios</option>
                  </select>
                  <input
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
                    type='number'
                    value={precio}
                    placeholder='Precio'
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                  <input
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
                    type='number'
                    value={stock}
                    placeholder='Cantidad EJ: 50'
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <textarea
                    placeholder='Descripción del café (notas de sabor, altura...)'
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className='w-full m-2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500'
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
                    <th className='p-4'>Descripcion</th>
                    <th className='p-4'>Origen</th>
                    <th className='p-4'>Categoria</th>
                    <th className='p-4'>Stock</th>

                    <th className='p-4 text-center'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id} className='border-t border-slate-100 hover:bg-slate-50 transition'>
                      <td className='p-4'>
                        {p.imagen ? (
                          <img
                            src={`http://localhost:3000/uploads/${p.imagen}`}
                            alt={p.nombre}
                            className='w-12 h-12 rounded-lg object-cover border shadow-sm'
                          />
                        ) : (
                          <div className='w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-[10px] text-slate-400'>
                            Sin foto
                          </div>
                        )}
                      </td>
                      <td className='p-4 font-semibold text-slate-700'>{p.nombre}</td>
                      <td className='p-4 text-green-600 font-medium'>${p.precio}</td>
                      <td className='p-4 text-slate-600 text-sm truncate max-w-[150px]'>{p.descripcion}</td>
                      <td className='p-4 text-slate-600'>{p.origen}</td>
                      <td className='p-4'>
                        <span className='px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-bold'>
                          {p.categoria}
                        </span>
                      </td>
                      <td className='p-4 font-mono'>
                        {/* 🔥 Mejora: Color rojo si hay poco stock */}
                        <span className={p.stock < 5 ? 'text-red-500 font-bold' : 'text-slate-700'}>{p.stock}</span>
                      </td>
                      <td className='p-4 text-center'>
                        <div className='flex justify-center gap-2'>
                          <button
                            onClick={() => {
                              setEditarId(p.id);
                              setNombre(p.nombre);
                              setPrecio(p.precio);
                              setDescripcion(p.descripcion);
                              setOrigen(p.origen);
                              setCategoria(p.categoria);
                              setStock(p.stock);
                              // Opcional: mostrar la imagen actual como preview
                              setPreview(`http://localhost:3000/uploads/${p.imagen}`);
                            }}
                            className='p-2 hover:bg-blue-50 rounded-lg transition'
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => eliminarProducto(p.id)}
                            className='p-2 hover:bg-red-50 rounded-lg transition'
                          >
                            🗑️
                          </button>
                        </div>
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
