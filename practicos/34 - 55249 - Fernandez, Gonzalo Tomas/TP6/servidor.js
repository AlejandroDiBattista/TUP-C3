// servidor.js

import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import User from './routers/user.router.js';

const app = express();

app.use(morgan('dev'));     // Logea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos
app.disable('x-powered-by');

app.use(User);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
