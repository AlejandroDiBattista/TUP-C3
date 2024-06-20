// server.js
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

const users = new Map()

app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (users.has(username)) {
        return res.status(400).json({ message: 'Usuario ya existe' })
    }
    users.set(username, { username, password })
    res.status(201).json({ message: 'Usuario registrado correctamente' })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.get(username)
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales inválidas' })
    }
    res.cookie('username', username, { httpOnly: true })
    res.json({ message: 'Inicio de sesión exitoso' })
})

app.post('/logout', (req, res) => {
    res.clearCookie('username')
    res.json({ message: 'Cierre de sesión exitoso' })
})

app.get('/info', (req, res) => {
    const username = req.cookies.username
    if (!username) {
        return res.status(401).json({ message: 'Usuario no autenticado' })
    }
    const user = users.get(username)
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.json({ username: user.username })
})

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'))
})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000')
})
