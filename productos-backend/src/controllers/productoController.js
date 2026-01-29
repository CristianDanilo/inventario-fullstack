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
export const crearproducto = async (req, res) =>{
    try {
    const { nombre, precio } = req.body;
    if(!nombre || isNaN(precio) || precio<0){
        return res.status(400).json({mensaje: 'Datos inválidos: nombre y precio positivo requeridos'})
    }
    const [result] = await db.query('INSERT INTO productos (nombre,precio) VALUES (?,?)', [nombre, precio]);
    res.status(201).json({ id: result.insertId, nombre, precio });
    } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer productos' });
    }
};
// Actualizar
export const updateProducto = async (req, res) =>{
    try {
            const { id } = req.params;
            const { nombre, precio } = req.body;
            const [result] = await db.query('UPDATE productos SET nombre = ?, precio = ? WHERE id= ?', [
              nombre,
              precio,
              id,
            ]);

            if (result.affectedRows === 0) {
              return res.status(404).json({ mensaje: 'Producto no encontrado' });
            }
            res.json({ mensaje: 'Producto actualizado con éxito' });
    } catch (error) {
        res.status(500).json({mensaje: 'Error al actualizar'});
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