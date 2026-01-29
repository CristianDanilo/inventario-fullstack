//conexion de la base de datos
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tienda_db',
});

console.log('Conexión a MySQL exitosa desde config')

export default db;