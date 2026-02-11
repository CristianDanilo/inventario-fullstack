import db from '../config/db.js'

export const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

export const create = async (email, password) => {
    const [result] = await db.query('INSERT INTO usuarios(email, password) VALUES (?,?)',
    [email, password]
    );
    return result.insertId;
}