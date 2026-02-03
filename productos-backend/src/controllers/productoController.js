//recibe las peticiones req y envia las respuesta res
import db from '../config/db.js'

//Función para obtener todos

export const getProductos = async (req, res) =>{
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al leer productos'});
    }
};

//Funcion para crear
export const crearproducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    // req.file viene gracias a Multer. Tomamos el filename generado.
    const imagenUrl = req.file ? req.file.filename : null;

    if (!nombre || isNaN(precio) || precio < 0) {
      return res.status(400).json({ mensaje: 'Datos inválidos' });
    }

    const [result] = await db.query('INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)', [
      nombre,
      precio,
      imagenUrl,
    ]);

    res.status(201).json({ id: result.insertId, nombre, precio, imagenUrl });
  } catch (error) {
    console.error(error); // Siempre es bueno ver el error real en consola
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
};
// Actualizar
export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    // 1. Verificamos si subieron una nueva imagen
    const nuevaImagen = req.file ? req.file.filename : null;

    let query = 'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?';
    let params = [nombre, precio, id];

    // 2. Si hay nueva imagen, la incluimos en la query
    if (nuevaImagen) {
      query = 'UPDATE productos SET nombre = ?, precio = ?, imagen = ? WHERE id = ?';
      params = [nombre, precio, nuevaImagen, id];
    }

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar' });
  }
};

//Función para eliminar
export const deleteProducto = async (req,res) =>{
    try {
            const { id } = req.params;
            await db.query('DELETE FROM productos WHERE id = ?', [id]);
            res.json({ mensaje: 'Eliminado con éxito' });
    } catch (error) {
        res.status(500).json({mensaje: 'Error al eliminar'})
    }

}