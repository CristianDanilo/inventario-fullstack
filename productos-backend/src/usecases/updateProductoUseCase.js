import * as productRepo from '../repositories/productRepository.js';

export const ejecutar = async (id, datos) => {
  if (!id) throw new Error('El ID del producto es necesario');

  // Si el precio viene como string, lo convertimos
  if (datos.precio) datos.precio = parseFloat(datos.precio);
  if (datos.stock) datos.stock = parseInt(datos.stock);

  const actualizado = await productRepo.update(id, datos);

  if (!actualizado) throw new Error('Producto no encontrado o no se realizaron cambios');

  return { mensaje: 'Producto actualizado con éxito' };
};
