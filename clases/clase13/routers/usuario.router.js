import express from 'express';
import Usuario from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/usuarios', Usuario.traer);
router.post('/registrar', Usuario.registrar)
router.put('/login', Usuario.login)
router.put('/logout', Usuario.validarUsuario, Usuario.logout)
router.get('/info', Usuario.validarUsuario, Usuario.info)

export default router;