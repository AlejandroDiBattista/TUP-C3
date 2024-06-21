import argon2 from 'argon2'
import jwt from 'jsonwebtoken'


const SECRET = "esto_es_un_secreto"

function generarToken() {
    return Math.random().toString().substring(2)
}

function validar(req, res, next) {
    let { token = '' } = req.cookies;

    let usuario = jwt.verify(token, SECRET)

    if (!usuario) {
        res.status(401).json({ ok: false, mensaje: 'No autorizado' });
        return;
    }

    // let usuario = usuarios.find(u => u.token === token);
    // if (!usuario) {
    //     res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    //     return
    // }

    req.usuario = usuario;
    next();
}

let usuarios = [
    { user: "admin", password: "admin" },
]

function listar(req, res) {
    res.json(usuarios)
}

async function registrar(req, res) {
    let { user, password } = req.body

    let usuario = usuarios.find(u => u.user === user)
    if (usuario) {
        res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado' })
    } else {
        password = await argon2.hash(password)

        usuarios.push({ user, password })
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' })
    }
}

async function login(req, res) {
    let { user, password } = req.body

    let usuario = usuarios.find(u => u.user === user)
    if (usuario && await argon2.verify(usuario.password, password)) {

        let token = jwt.sign({ usuario }, SECRET, { expiresIn: '1h' })
        res.cookie('token', token)
        
        res.status(200).json({ ok: true, mensaje: 'Usuario logueado' })
    } else {
        res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' })
    }
}

function logout(req, res) {
    let usuario = req.usuario
    delete usuario.token

    res.status(200).json({ ok: true, mensaje: 'Usuario deslogueado' })
}

function info(req, res) {
    let usuario = req.usuario
    res.status(200).json({ ok: true, mensaje: 'Información secreta :', usuario: usuario.user })
}

export default { listar, registrar, login, logout, info, validar }
