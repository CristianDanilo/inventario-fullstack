import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepository.js';

export const ejecutar = async(email, password) => {
    //1 Buscar usuario
    const usuario = await userRepo.findByEmail(email);
    if(!usuario) throw new Error('Credenciales inválidos')
    //2 Validar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if(!esValida) throw new Error('Credenciales inválidas');

    //Generar Token
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email, rol: usuario.rol},
        process.env.JWT_SECRET,
        {expiresIn: '1h' }
    );
    return { token, rol: usuario.rol };
}