import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

let usersList = [
    { usuario: "admin", contrasena: "admin" },
]

function createToken() {
    return Math.random().toString().substring(2);
}

app.get('/usuarios', (req, res) => {
    res.json(usersList);
});

app.post('/registro', (req, res) => {
    let { usuario, contrasena } = req.body;
    console.log(usuario, contrasena)
    if (!usuario || !contrasena) {
        res.status(400).json({ ok: false, mensaje: 'Falta usuario o contraseña' });
        return;
    }

    let existingUser = usersList.find(u => u.usuario === usuario);
    if (existingUser) {
        res.status(401).json({ ok: false, mensaje: 'Este usuario ya existe' });
    } else {
        usersList.push({ usuario, contrasena });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    }
});

app.put('/cerrarSesion', (req, res) => {
    let user = usersList.find(u => u.token);

    if (user) {
        delete user.token;
        res.clearCookie('token');
        res.status(200).json({ ok: true, mensaje: 'Se cerró sesión correctamente' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Token o usuario no encontrado' });
    }
})

app.get('/info', (req, res) => {
    let token = req.cookies.token;

    if (!token) {
        res.status(401).json({ ok: false, mensaje: 'No session started' });
        return;
    }

    let user = usersList.find(u => u.token === token);
    if (user) {
        res.status(200).json({ ok: true, mensaje: 'Informacion secreta. Bienvenidx de vuelta: ', usuario: user.usuario, token: token });
    }
})

app.put('/iniciarSesion', (req, res) => {
    let token = req.cookies.token;
    let { usuario, contrasena } = req.body;

    let loggedInUser = usersList.find(u => u.usuario === usuario && contrasena === u.contrasena && u.token);
    if (loggedInUser) {
        res.status(401).json({ ok: false, mensaje: 'Sesión iniciada' });
        console.log(token)
        return;
    }
    console.log(usersList);
    
    let user = usersList.find(u => u.usuario === usuario && contrasena === u.contrasena && !u.token);
    
    if (user) {
        let token = createToken();
        user.token = token;
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 10) //verificar
        });
        res.status(200);
        res.json({ ok: true, mensaje: 'Usuario Registrado' });
    }
    else {
        res.status(401).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});