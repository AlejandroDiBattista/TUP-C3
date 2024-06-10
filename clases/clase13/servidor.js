import express from 'express';
import morgan from 'morgan';

const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());

function generarToken() {
    return Math.random().toString().substring(2);
}

function validarUsuario(req, res, next) {
    let token = req.get('Authorization');
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401);
        res.json({ok: false, mensaje: 'No autorizado'});
    }
}

let usuarios = [
    { user: "admin", password: "admin" } ,
]

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/registrar', (req, res) => {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401);  
        res.json({ok: false, mensaje: 'Usuario ya registrado'});
    } else {
        usuarios.push({ user, password });
        res.status(201); // Created
        res.json({ok: true, mensaje: 'Usuario registrado'});
    }
})

app.put('/login', (req, res) => {
    let { user, password } = req.body;

    let usuario = usuarios.find(u => u.user === user &&
                                     u.password === password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.set('Authorization', token);
        res.status(200);
        res.json({ok: true, mensaje: 'Usuario logueado'});
    } else {
        res.status(401);
        res.json({ok: false, mensaje: 'Usuario o contraseña incorrectos'});
    }
})

app.put('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.status(200);
    res.json({ok: true, mensaje: 'Usuario deslogueado'});
})

app.get('/info', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    res.status(200);
    res.json({ok: true, mensaje: 'Información secreta', usuario: usuario.user});
})

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});	