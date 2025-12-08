import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
const usuarios = [
    { usuario: 'admin', contrasena: 'admin' }
];

function generarToken() {
    return Math.random().toString().substring(2);
};

app.get('/usuarios', (req, res) => {
    if (usuarios.length === 0) {
        return res.status(404).json({ message: 'No hay usuarios registrados' });
    }
    res.json({ usuarios: usuarios });
});


app.get('/informacion', (req, res) => {
    let token = req.cookies.token;
    if (!token) {
        res.status(401).json({ ok: false, mensaje: 'No puede acceder a la información secreta, no hay sesion iniciada' });
        return;
    }
    let user = usuarios.find(u => u.token === token);
    if (user) {
        res.status(200).json({ ok: true, mensaje: 'Información secreta desbloqueada. Bienvenido usuario: ', user: user.usuario , token: token});
    }
});

app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;
    const usuarioExistente = usuarios.find(u => u.usuario === usuario);

    if (usuarioExistente) {
        return res.status(500).json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        usuarios.push({ usuario, contrasena });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado exitosamente' });
    }
});

app.put('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    const usuarioExistente = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (!usuarioExistente) {
        return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado.' });
    }

    if (usuarioExistente.token) {
        return res.status(401).json({ ok: false, mensaje: 'Ya hay una sesión iniciada con esta cuenta.' });
    }

    const token = generarToken();
    usuarioExistente.token = token;
    console.log('Token generated:', token);
    
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ ok: true, mensaje: 'Inicio de sesión exitoso.', usuario: usuarioExistente.usuario });
});


app.post('/logout', (req, res) => {
    const token = req.cookies.token;
    const usuario = usuarios.find(u => u.token === token);
    if (!usuario) {
        return res.status(401).json({ ok: false, mensaje: 'Error: La sesión del usuario es inválida o ya expiró.' });
    }
    delete usuario.token;
    res.clearCookie('token');
    res.status(200).json({ ok: true, mensaje: 'Usuario cerró la sesión.' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});