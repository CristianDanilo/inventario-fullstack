import * as productRepo from '../repositories/productRepository.js';

export const ejecutar = async (datos) => {
  if (!datos.nombre || datos.precio < 0) {
    throw new Error('El nombre es obligatorio y el precio no puede ser negativo');
  }

  const id = await productRepo.create({
    ...datos,
    stock: datos.stock || 0,
  });

  return { id, ...datos, mensaje: 'Producto creado con éxito' };
};
