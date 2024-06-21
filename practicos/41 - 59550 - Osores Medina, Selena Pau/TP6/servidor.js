import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const puerto = 3000;

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

// Array de objetos (Datos)
let Usuarios = [
    { username: 'admin', password: 'admin' },
];

// Ruta para obtener la lista de usuarios (ejemplo)
app.get('/usuarios', (req, res) => {
    res.status(200).json(Usuarios);
});

// Ruta de registro
app.post('/register', (req, res) => {
    const { name, pass } = req.body;
    const usuarioExiste = Usuarios.find((user) => user.username === name);
    if (usuarioExiste) {
        return res.status(400).json({ error: 'El user ya existe' });
    }
    Usuarios.push({ username: name, password: pass });
    console.log('user registrado:', { username: name, password: pass });
    res.status(200).json({ message: 'user registrado correctamente' });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { name, pass } = req.body;
    const user = Usuarios.find((user) => user.username === name && user.password === pass);
    if (!user) {
        return res.status(401).json({ error: 'user o pass incorrectos' });
    }
    res.cookie('user', name, { maxAge: 900000, httpOnly: true });
    console.log('Inicio de sesión exitoso');
    console.log('user logueado:', { username: name, password: pass });
    res.status(200).json({ message: 'user logueado correctamente' });
});

// Ruta de deslogueo
app.post('/logout', (req, res) => {
    res.clearCookie('user');
    console.log('user deslogueado');
    console.log('Sesión cerrada');
    res.status(200).json({ message: 'user deslogueado correctamente' });
});

// Middleware para manejar errores 404 (no encontrado)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicia el servidor y escucha en el puerto definido
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});