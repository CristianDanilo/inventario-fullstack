import * as loginUC from '../usecases/loginUseCase.js';
import * as registrarUC from '../usecases/registrarUseCase.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await loginUC.ejecutar(email, password);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

export const registrar = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultado = await registrarUC.ejecutar(email, password);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
