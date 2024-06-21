import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';

const app = express();
const puerto = 3000;

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
const Usuarios = [
    { username: 'Agustin', password: '12345' },
    { username: 'Jose', password: '6789' },
    { username: 'Martina', password: '12345' },
    { username: 'Guillermo', password: '1234' },
    { username: 'Lucas', password: '12344' },
]; 
