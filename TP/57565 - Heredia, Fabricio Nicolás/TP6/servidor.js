import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

const usersList = [
    { usuario: "admin", contrasena: "admin" },
];

const generateToken = () => Math.random().toString(36).substring(2);

app.get('/usuarios', (req, res) => {
    res.json(usersList);
});

app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;
    console.log(usuario, contrasena);
    if (!usuario || !contrasena) {
        return res.status(400).json({ ok: false, mensaje: 'Falta usuario o contraseña' });
    }

    const userExists = usersList.some(u => u.usuario === usuario);
    if (userExists) {
        return res.status(401).json({ ok: false, mensaje: 'Este usuario ya existe' });
    } else {
        usersList.push({ usuario, contrasena });
        return res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    }
});

app.put('/cerrarSesion', (req, res) => {
    const user = usersList.find(u => u.token);
    if (user) {
        delete user.token;
        res.clearCookie('token');
        return res.status(200).json({ ok: true, mensaje: 'Se cerró sesión correctamente' });
    } else {
        return res.status(401).json({ ok: false, mensaje: 'usuario no encontrado' });
    }
});

app.get('/info', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ ok: false, mensaje: 'No session started' });
    }

    const user = usersList.find(u => u.token === token);
    if (user) {
        return res.status(200).json({ ok: true, mensaje: 'Información. Bienvenido de nuevo: ', usuario: user.usuario, token });
    }
    return res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado' });
});

app.put('/iniciarSesion', (req, res) => {
    const { usuario, contrasena } = req.body;
    const token = req.cookies.token;

    const alreadyLoggedIn = usersList.find(u => u.usuario === usuario && u.contrasena === contrasena && u.token);
    if (alreadyLoggedIn) {
        console.log(token);
        return res.status(401).json({ ok: false, mensaje: 'Sesión ya iniciada' });
    }

    const user = usersList.find(u => u.usuario === usuario && u.contrasena === contrasena && !u.token);
    if (user) {
        const newToken = generateToken();
        user.token = newToken;
        res.cookie('token', newToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 10),
        });
        return res.status(200).json({ ok: true, mensaje: 'Sesión abierta correctamente' });
    } else {
        return res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }
});


app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});