// Array de usuarios inicial con un usuario de ejemplo
let usuarios = [
    { user: "Josecito", password: "J89HL@fa9" },
]

// Función para generar un token aleatorio
function generarToken() {
    return Math.random().toString().substring(2);
}

// Middleware para validar si el usuario tiene un token válido en las cookies
function validarUsuario(req, res, next) {
    // Obtener el token de las cookies de la solicitud
    let token = req.cookies.token;
    console.log('Token:', token);

    // Verificar si no hay token
    if (!token) {
        res.status(401); // Unauthorized
        res.json({ ok: false, mensaje: 'Sin token' });
        return;
    }

    // Buscar el usuario que coincide con el token proporcionado
    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        req.usuario = usuario; // Adjuntar el usuario encontrado a la solicitud
        next(); // Continuar con el siguiente middleware o ruta
    } else {
        res.status(401); // Unauthorized
        res.json({ ok: false, mensaje: 'No autorizado' });
    }
}

// Función asincrónica para registrar un nuevo usuario
async function registrar(req, res) {
    let { user, password } = req.body;

    // Verificar si el usuario ya está registrado
    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401); // Unauthorized
        res.json({ ok: false, mensaje: 'Usuario ya registrado' });
    } else {
        // Agregar el nuevo usuario al array de usuarios
        usuarios.push({ user, password });
        res.status(201); // Created
        res.json({ ok: true, mensaje: 'Usuario registrado' });
    }
}

// Función para devolver la lista de usuarios como respuesta JSON
function traer(req, res) {
    res.json(usuarios);
}

// Función para desloguear al usuario eliminando su token de las cookies
function logout(req, res) {
    let usuario = req.usuario; // Obtener el usuario de la solicitud
    delete usuario.token; // Eliminar el token del usuario
    res.clearCookie('token'); // Limpiar la cookie 'token' en la respuesta
    res.status(200); // OK
    res.json({ ok: true, mensaje: 'Usuario deslogueado' });
}

// Función para obtener información secreta del usuario autenticado
function info(req, res) {
    let usuario = req.usuario; // Obtener el usuario de la solicitud
    res.status(200); // OK
    res.json({ ok: true, mensaje: 'Información secreta', usuario: usuario.user });
}

// Función asincrónica para realizar el login del usuario
async function login(req, res) {
    let { user, password } = req.body;

    // Buscar al usuario por nombre de usuario y contraseña
    let usuario = usuarios.find(u => u.user === user && password === u.password);
    if (usuario) {
        let token = generarToken(); // Generar un nuevo token
        usuario.token = token; // Asignar el token al usuario encontrado
        res.cookie('token', token, { // Configurar la cookie 'token' en la respuesta
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 5) // Expira en 5 segundos
        });
        res.status(200); // OK
        res.json({ ok: true, mensaje: 'Usuario logueado' });
    }
}

// Exportar todas las funciones del controlador de usuario
export default {
    traer,
    registrar,
    login,
    logout,
    info,
    validarUsuario,
    Registrar: registrar // Alias opcional para la función registrar
};
