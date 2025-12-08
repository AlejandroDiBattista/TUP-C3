import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let usuarios = [
    { user: "andres", password: "1234" }
];

function generarToken() {
    return Math.random().toString().substring(2);
};

function validar(req, res, next) {
    let { token } = req.cookies;
    if (token) {
        req.usuario = { user: 'andres' };
        next();
    } else {
        res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }
}

async function registrar(req, res) {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        usuarios.push({ user, password });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    }
}

async function login(req, res) {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = generarToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ ok: true, mensaje: 'Usuario logueado' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }
}

function logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ ok: true, mensaje: 'Usuario deslogueado' });
}

function info(req, res) {
    let usuario = req.usuario;
    res.status(200).json({ ok: true, mensaje: 'Información secreta!', usuario: usuario.user });
}

// Implementar las rutas necesarias
app.post('/registrar', registrar);
app.put('/login', login);
app.put('/logout', validar, logout);
app.get('/info', validar, info);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});