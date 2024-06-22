let usuarios = [
    { user: "admin", password: "admin" },
];

function generarToken() {
    // Función para generar un token aleatorio (NO usar en producción real)
    return Math.random().toString(36).substring(7);
}

function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    console.log('Token:', token);
    if (!token) {
        return res.status(401).json({ ok: false, mensaje: 'Sin token' });
    }
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        return res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }
}

async function registrar(req, res) {
    let { user, password } = req.body;
    let usuarioExistente = usuarios.find(u => u.user === user);
    if (usuarioExistente) {
        return res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        let token = generarToken();
        usuarios.push({ user, password, token });
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Ejemplo: expira en 1 día
        });
        return res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
    }
}

function traer(req, res) {
    res.json(usuarios);
}

function logout(req, res) {
    let usuario = req.usuario;
    delete usuario.token;
    res.clearCookie('token');
    res.status(200);
    res.json({ ok: true, mensaje: 'Usuario deslogueado' });
}

function info(req, res) {
    let usuario = req.usuario;
    res.status(200);
    res.json({ ok: true, mensaje: 'Información secreta', usuario: usuario.user });
}

async function login(req, res) {
    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = generarToken(); // Generar token seguro (no usar Math.random() en producción)
        usuario.token = token; // Asignar el token al usuario encontrado
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Ejemplo: expira en 1 día
        });
        res.status(200);
        res.json({ ok: true, mensaje: 'Usuario logueado' });
    } else {
        res.status(401);
        res.json({ ok: false, mensaje: 'Credenciales incorrectas' });
    }
}

export default { traer, registrar, login, logout, info, validarUsuario };
