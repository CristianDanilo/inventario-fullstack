import db from '../config/db.js';

export const findAll = async () => {
  const [rows] = await db.query('SELECT * FROM productos');
  return rows;
};

export const create = async (data) => {
  const { nombre, precio, imagen, descripcion, origen, categoria, stock } = data;
  const [result] = await db.query(
    'INSERT INTO productos (nombre, precio, imagen, descripcion, origen, categoria, stock) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, precio, imagen, descripcion, origen, categoria, stock]
  );
  return result.insertId;
};

export const update = async (id, data) => {
  // Filtramos para no intentar actualizar campos indefinidos
  const keys = Object.keys(data).filter((key) => data[key] !== undefined);
  if (keys.length === 0) return false;

  const query = `UPDATE productos SET ${keys.map((key) => `${key} = ?`).join(', ')} WHERE id = ?`;
  const values = [...keys.map((key) => data[key]), id];

  const [result] = await db.query(query, values);
  return result.affectedRows > 0;
};

export const remove = async (id) => {
  const [result] = await db.query('DELETE FROM productos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
