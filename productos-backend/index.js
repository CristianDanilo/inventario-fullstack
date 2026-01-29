import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productoRoutes from './src/routes/productoRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

//Cualquier ruta que empiece con /api/productos, mandala al archivo de rutas

app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);

// Middleware personalizado: El "Vigilante"
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Petición: ${req.method} a la ruta: ${req.url}`);
  next(); // ¡Importante! Si no pones next(), la petición se queda trabada aquí
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
