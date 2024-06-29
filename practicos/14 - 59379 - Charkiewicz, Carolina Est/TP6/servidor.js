import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan('dev')); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(bodyParser.urlencoded({ extended: true })); // Para leer formularios
app.use(bodyParser.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos
app.use(cors({
    origin: 'http://localhost:3000', // La URL del frontend
    credentials: true
}));
app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// Almacén de usuarios (En memoria)
const users = {};

// Rutas
app.post('/registrar', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }
    users[username] = password;
    res.json({ message: 'Usuario registrado exitosamente' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username;
        return res.json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
});

app.get('/info', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    res.json({ message: `Bienvenido ${req.session.user}` });
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Sesión cerrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});