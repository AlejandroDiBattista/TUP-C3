import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
, { token } from 'morgan';
const app = express();

const PORT = 3000;

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

let usuarios = [{user:"admin", password:"1234"}];

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }
    const usuario = usuarios.find(u => u.token === token);
    if (!usuario) {
        return res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }
    req.usuario = usuario;
    next();
};

function generarToken() {
    return Math.random().toString().substring(2);
};

app.post('/register', async (req, res) => {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        usuarios.push({ user, password });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
        console.log('Usuarios registrados:', usuarios);
    }
});
app.post('/login', async (req, res) => {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user && password === u.password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 600000)
        });
        res.status(200).json({ ok: true, mensaje: 'Usuario logueado', token });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }
});

app.put('/logout', authMiddleware, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.clearCookie('token');
    res.status(200).json({ ok: true, mensaje: 'Usuario deslogueado' });
});

app.get('/info', authMiddleware, (req, res) => {
    let usuario = req.usuario;
    res.status(200).json({ ok: true, mensaje: 'Esta logueado', usuario: usuario.user });
});

app.get('/usuarios', (req, res) => {
    res.status(200).json({ usuarios});
});