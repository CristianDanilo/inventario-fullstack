import express from 'express';
import { getProductos, crearproducto, deleteProducto, updateProducto } from '../controllers/productoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js'; // <-- ¡No olvides este import!
const router = express.Router();

// RUTAS PÚBLICAS (Cualquiera puede ver los productos)
router.get('/', getProductos);

// RUTAS PROTEGIDAS (Solo con Token/Login) 🔒
router.post('/', verificarToken, crearproducto);
router.put('/:id', verificarToken, updateProducto);
router.delete('/:id', verificarToken, deleteProducto);

export default router;
