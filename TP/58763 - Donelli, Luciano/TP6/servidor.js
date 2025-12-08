import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

let usuariosRegistrados = [
    { id: 1, username: 'lucianod', password: '1234' },
    { id: 2, username: 'nicox', password: 'carp24' },
    { id: 3, username: 'diaxn', password: 'nn23dd' },
    { id: 4, username: 'carrizox', password: 'acily' },
    { id: 5, username: 'augustx', password: 'moon' },
];

let nextUserId = 6; // Para asignar automáticamente el siguiente ID al registrar un nuevo usuario


app.post('/registro', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;
    const usuarioExistente = usuariosRegistrados.find(user => user.username === nombreUsuario);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuario existente en la base de datos' });
    }
    
    const nuevoUsuario = { id: nextUserId++, username: nombreUsuario, password: contraseña };
    usuariosRegistrados.push(nuevoUsuario);
    console.log('Nuevo usuario registrado:', nuevoUsuario);
    res.status(200).json({ message: 'Tu cuenta se ha registrado correctamente!', user: nuevoUsuario });
});

app.post('/acceso', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;
    const usuario = usuariosRegistrados.find(user => user.username === nombreUsuario && user.password === contraseña);
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    res.cookie('sesionUsuario', nombreUsuario, { maxAge: 3600000, httpOnly: true });
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
});

app.post('/salida', (req, res) => {
    res.clearCookie('sesionUsuario');
    console.log('Sesión cerrada');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
