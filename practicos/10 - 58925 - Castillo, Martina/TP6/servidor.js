import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import usuarioRouter from './routers/usuario.router.js'; // Importa el router de usuario

const app = express();
const PORT = 3001;

// Middleware
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use(usuarioRouter);

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
