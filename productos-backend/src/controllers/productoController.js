import * as productRepo from '../repositories/productRepository.js';
import * as crearProductoUC from '../usecases/crearProductoUseCase.js';
import * as updateProductoUC from '../usecases/updateProductoUseCase.js';

export const getProductos = async (req, res) => {
  try {
    const productos = await productRepo.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al leer productos' });
  }
};

export const crearproducto = async (req, res) => {
  try {
    const datos = {
      ...req.body,
      imagen: req.file ? req.file.filename : null,
      precio: parseFloat(req.body.precio),
      stock: parseInt(req.body.stock),
    };

    const resultado = await crearProductoUC.ejecutar(datos);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await productRepo.remove(id);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar' });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Preparamos los datos que vienen del body
    const datosAActualizar = { ...req.body };

    // Si Multer subió una imagen nueva, la añadimos a los datos
    if (req.file) {
      datosAActualizar.imagen = req.file.filename;
    }

    const resultado = await updateProductoUC.ejecutar(id, datosAActualizar);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: error.message });
  }
};