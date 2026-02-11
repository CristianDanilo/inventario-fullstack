import express from 'express';
import { createPedido } from '../controllers/pedidoController';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, createPedido);

export default router;
