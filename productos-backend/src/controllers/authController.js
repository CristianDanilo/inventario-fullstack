import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Buscar al usuario
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

    const usuario = rows[0];

    // 2. Comparar contraseña
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    // 3. Crear el Token (Corregido: añadida la JWT_SECRET)
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('DETALLE DEL ERROR:', error); // Esto imprimirá el error real en la terminal
    res.status(500).json({ mensaje: 'Error en el login' });
  }
};

export const registrar = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    // Corregido el paréntesis en VALUES
    await db.query('INSERT INTO usuarios (email, password) VALUES (?, ?)', [email, passwordEncriptado]);

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};
