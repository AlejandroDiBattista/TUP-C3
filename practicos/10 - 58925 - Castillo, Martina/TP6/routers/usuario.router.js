import express from 'express';
import UsuarioController from '../controllers/usuario.controller.js'; // Importa el controlador de usuario

const router = express.Router();

router.get('/usuarios', UsuarioController.traer);
router.post('/registrar', UsuarioController.registrar);
router.put('/login', UsuarioController.login);
router.put('/logout', UsuarioController.validarUsuario, UsuarioController.logout);
router.get('/info', UsuarioController.validarUsuario, UsuarioController.info);

export default router;
