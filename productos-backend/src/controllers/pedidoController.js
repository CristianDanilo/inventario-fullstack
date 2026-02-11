import * as crearPedidoUC from '../usecases/crearPedidoUseCase.js';

export const crearPedido = async (req, res) => {
    try {
        const {total, productos} = req.body;
        const usurio_id = req.usurio_id;
        const resultado = await crearPedidoUC.ejecutar({ usurio_id, total, productos});

        res.status(201).json(resultado);
    } catch(error){
        console.error(error);
        res.status(400).json({ mensaje: error.message || 'Error al procesar el pedido'});
    }
};