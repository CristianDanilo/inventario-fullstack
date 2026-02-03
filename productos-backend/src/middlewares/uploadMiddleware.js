import multer from 'multer';
import path from 'path';

//Configuramos el 'almacenamiento'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        //Creamos un nombre único: fecha + nombre-original
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

export const upload = multer({ storage })