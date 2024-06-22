import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import userRouter from './routers/user.router.js'; 

const app = express();
const PORT = 3001;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use(userRouter); 

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
