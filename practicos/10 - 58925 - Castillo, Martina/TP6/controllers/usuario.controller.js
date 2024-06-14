let usuarios = [
    { user: "admin", password: "admin" },
]
function generarToken() {
    return Math.random().toString().substring(2);
}
function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    console.log('Token:', token)
    if (!token) {
        res.status(401);
        res.json({ ok: false, mensaje: 'Sin token' });
        return;
    }
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401);
        res.json({ ok: false, mensaje: 'No autorizado' });
    }
}
async function registrar(req, res) {
    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401);
        res.json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        usuarios.push({ user, password });
        res.status(201);
        res.json({ ok: true, mensaje: 'Usuario registrado' });
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
    let usuario = usuarios.find(u => u.user === user &&
        password === u.password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token,
            {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 5)
            });
        res.status(200);
        res.json({ ok: true, mensaje: 'Usuario logueado' });
    }
}

export default { traer, registrar, login, logout, info, validarUsuario, Registrar: registrar };