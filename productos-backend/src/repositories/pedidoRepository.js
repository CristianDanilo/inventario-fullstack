import db from '../config/db.js'

export const savePedidoFull = async(usuario_id, total, productos) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        //1. Insertar pedido
        const [pedidoRes] = await connection.query(
            'INSERT INTO pedidos ( usuario_id, total) VALUES (?,?)', [usuario_id, total]
        );
        const pedidoId = pedidoRes.insertId;

        //2. Insertar detalles y actualizar stock
        for(const item of productos){
            await connection.query('INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)', [pedidoId, item.id, item,cantidad, item.precio]
            );
            await connection.query(
                'UPDATE productos SET stock = stock - ? WHERE id = ?',
                [item.cantidad, item.id]
            );
        }
        await connection.commit();
        return pedidoId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}