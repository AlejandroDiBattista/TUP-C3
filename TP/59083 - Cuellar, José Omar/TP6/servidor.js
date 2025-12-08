import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import usuario from './routers/usuario.router.js';



const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(usuario)
app.use(express.static('public'));  // Para servir archivos estáticos

// app.get('/poner', (req, res) => {
//     res.cookie('mensaje', 'Esto lo acabo de escribir'
//         , { expires: new Date(Date.now() + 1000 * 5) });
    
//     res.json({ ok: true });
// });

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});