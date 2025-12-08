import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import argon2 from 'argon2';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

let usuarios = [];

async function inicializarUsuarios() {
    const hashedPassword = await argon2.hash('admin');
    usuarios.push({ user: 'admin', password: hashedPassword });
}

inicializarUsuarios();

function generarToken() {
    return Math.random().toString().substring(2);
}

function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }
}

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/registrar', async (req, res) => {
    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        return res.json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        let hashedPassword = await argon2.hash(password);
        usuarios.push({ user, password: hashedPassword });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    }
});

app.post('/login', async (req, res) => {
    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user);
    if (usuario && await argon2.verify(usuario.password, password)) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });
        res.json({ ok: true, mensaje: 'Usuario logeado' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrecta' });
    }
});

app.post('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.clearCookie('token');
    res.json({ ok: true, mensaje: 'Usuario deslogeado' });
});

app.get('/info', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    res.json({ ok: true, mensaje: 'Información secreta', usuario: usuario.user });
});

app.use(express.static('public')); // Para servir archivos estáticos

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
