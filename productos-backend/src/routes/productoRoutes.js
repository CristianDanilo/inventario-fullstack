import express from 'express';
import { getProductos, crearproducto, deleteProducto, updateProducto } from '../controllers/productoController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
const router = express.Router();

// RUTAS PÚBLICAS (Cualquiera puede ver los productos)
router.get('/', getProductos);

// RUTAS PROTEGIDAS (Solo con Token/Login) 🔒
router.post('/', verificarToken, esAdmin, upload.single('imagen'), crearproducto);
router.put('/:id', verificarToken, esAdmin, upload.single('imagen'), updateProducto);
router.delete('/:id', verificarToken, esAdmin,  deleteProducto);

export default router;
