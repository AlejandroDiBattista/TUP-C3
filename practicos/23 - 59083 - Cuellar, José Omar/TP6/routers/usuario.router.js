import express from 'express';
import Usuario from '../controllers/usuario.controller.js'; // Importa el controlador de usuario

const router = express.Router(); // Crea un nuevo enrutador de Express

// Rutas definidas para interactuar con el controlador de usuario

// Ruta GET para obtener todos los usuarios
router.get('/usuarios', Usuario.traer);

// Ruta POST para registrar un nuevo usuario
router.post('/registrar', Usuario.registrar);

// Ruta PUT para iniciar sesión de usuario
router.put('/login', Usuario.login);

// Ruta PUT para cerrar sesión de usuario
router.put('/logout', Usuario.validarUsuario, Usuario.logout);

// Ruta GET para obtener información de usuario autenticado
router.get('/info', Usuario.validarUsuario, Usuario.info);

export default router; // Exporta el enrutador para ser utilizado por la aplicación Express
