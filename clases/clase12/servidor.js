import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()

app.disable('x-powered-by')

app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

function validarToken(req, res, next) {
    const token = req.cookies.token
    if (token === '12345') {
        next();
    } else {
        res.status(401).json({ mensaje: 'No autorizado' })
    }
}

let contador = 0

app.get('/leer', (req, res) => {
    res.json({ valor: contador })
})


de paginas


app.put('/incrementar', (req, res) => {
    const { incremento = 1 } = req.body
    contador += incremento
    res.json({ valor: contador })
})

app.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    if (usuario === 'admin' && password === 'admin') {
        res.json({ mensaje: 'Login correcto' })
        res.cookie('token', '12345')
    } else {
        res.status(401).json({ mensaje: 'Login incorrecto' })
    }
})

app.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.json({ mensaje: 'Logout correcto' })
})


app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000")
})
