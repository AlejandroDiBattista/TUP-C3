import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos

// Lista de usuarios
const usuariosLista = [
    { usuario: 'admin', password: 'admin' },
];

// Rutas

// Obtener lista de usuarios (solo para pruebas, no en producción)
app.get('/users', (req, res) => {
    res.json(usuariosLista);
});

// Registrarse
app.post('/register', (req, res) => {
    const { usuario, password } = req.body;
    console.log(usuario, password);

    if (!usuario || !password) {
        res.status(400).json({ error: 'Faltan datos' });
        alert('Faltan datos');
        return;
    }

    const usuarioEncontrado = usuariosLista.find(u => u.usuario === usuario);

    if (usuarioEncontrado) {
        res.status(400).json({ error: 'El usuario ya existe' });
        alert('El usuario ya existe');
        return;
    } else {
        usuariosLista.push({ usuario, password });
        res.status(201).json({ message: 'Usuario creado' });
        alert('Usuario creado');
    }
});

// Iniciar sesión
app.put('/login', (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        res.status(400).json({ error: 'Faltan datos' });
        alert('Faltan datos');
        return;
    }

    const usuarioEncontrado = usuariosLista.find(u => u.usuario === usuario && u.password === password);

    if (usuarioEncontrado) {
        const token = Math.random().toString(36).substring(2);
        usuarioEncontrado.token = token;

        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
        });

        res.status(200).json({ message: 'Sesión iniciada', usuario, password });
        alert('Sesión iniciada');
    } else {
        res.status(400).json({ error: 'Credenciales incorrectas' });
        alert('Credenciales incorrectas');
    }
});

// Deslogearse
app.get('/logout', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(400).json({ error: 'No hay sesión activa' });
        alert('No hay una sesión activa');
        return;
    }

    const usuario = usuariosLista.find(u => u.token === token);

    if (usuario) {
        delete usuario.token;
        res.clearCookie('token');
        res.status(200).json({ message: 'Sesión cerrada' });
        alert('Sesión cerrada');
    } else {
        res.status(400).json({ error: 'No hay sesión activa' });
        alert('No hay una sesión activa');
    }
});

// Información del usuario
app.get('/info', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({ error: 'No hay una sesión activa' });
        alert('No hay una sesión activa');
        return;
    }

    const usuario = usuariosLista.find(u => u.token === token);

    if (!usuario) {
        res.status(401).json({ error: 'No hay una sesión activa' });
        alert('No hay una sesión activa');
        return;
    } else {
        res.json({ mensaje: 'Información del usuario', usuario: usuario.usuario });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
