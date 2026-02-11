import bcrypt from 'bcryptjs';
import * as userRepo from '../repositories/userRepository.js';

export const ejecutar = async (email, password) => {
    //Regla: Verificar si el email ya existe
    const existe = await userRepo.findByEmail(email);
    if(existe) throw new Error('El correo ya está resgitrado');

    //Encriptar
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    //Guardar 
    await userRepo.create(email, passwordHashed);

    return { mensaje: 'Usuario registrado exitosamente '};
}