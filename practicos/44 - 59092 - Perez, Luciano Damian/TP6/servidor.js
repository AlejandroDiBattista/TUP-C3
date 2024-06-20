import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let users = [];

// Register 
app.post('/register', (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        const token = Math.random().toString(36).substring(2);

        const newUser = { username, email, password, token };
        users.push(newUser);

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ message: 'Usuario registrado con éxito.', token, username });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor.' });
    }
});

// Login 
app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        
        res.cookie('token', user.token, { httpOnly: true });

        res.status(200).json({ message: 'Inicio de sesión exitoso.', token: user.token, username: user.username });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor.' });
    }
});

// Logout 
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
});

// Middleware de Autenticación
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    const user = users.find(user => user.token === token);
    if (!user) {
        return res.status(401).json({ message: 'Token inválido.' });
    }

    req.user = user;
    next();
};


app.get('/info', requireAuth, (req, res) => {
    res.status(200).json({ message: 'Información solo para usuarios conectados.', user: req.user });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});