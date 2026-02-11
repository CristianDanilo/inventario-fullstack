import * as pedidoRepo from '../repositories/pedidoRepository.js';

export const ejecutar = async (datosPedido) => {
    const {usuario_id, total, productos } = datosPedido;

    //Regla de Negocio: validar que el total sea coherente
    if(total <= 0) throw new Error('El total del pedido debe ser mayor a 0');

    //Regla de Negocio: validar que haya productos
    if(!productos || productos.length === 0){
        throw new Error('No se puede crear un pedido sin productos');
    }

    //si todo esta bien, llamamos al repositorio para persistir 
    const pedidoId = await pedidoRepo.savePedidoFull(usuario_id, total, productos);

    return{
        id: pedidoId,
        mensaje: 'Pedido procesado exitosamente'
    }
}