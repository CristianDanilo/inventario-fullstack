import  jwt  from "jsonwebtoken";
import 'dotenv/config';

export const verificarToken = (req, res, next) =>{
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.status(403).json({mensaje: 'Token requerido'})
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({mensaje : 'Token inválido o expirado'})
    }
};

export const esAdmin = (req, res, next) => {

    if(!req.user){
        return res.status(401).json({mensaje: 'No hay información de usuario' });
    }
    //Verificamos si el rol es 'admin'
    if(req.user.rol !== 'admin'){
        return res.status(403).json({
            mensaje: 'Acceso denegado: Se requiere de administrador'
        });
    }
    //Si todo está bien, pasamos a la siguiente funcion
    next()
}