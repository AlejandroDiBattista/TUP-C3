import express from 'express';
import UsuarioController from '../controllers/user.controller.js'; // Actualiza la importación del controlador

const router = express.Router();

router.get('/usuarios', UsuarioController.traerUsers);
router.post('/registrar', UsuarioController.registrarUser);
router.put('/login', UsuarioController.login);
router.put('/logout', UsuarioController.validarUser, UsuarioController.logout);
router.get('/info', UsuarioController.validarUser, UsuarioController.infoUser);

export default router;
