import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

let userAccounts = [
    { userId: "admin", userPassword: "admin" },
]

function createSessionToken() {
    return Math.random().toString().substring(2)
}

app.get('/usuarios', (req, res) => {
    res.json(userAccounts)
});

app.post('/registrar', (req, res) => {
    let { userId, userPassword } = req.body

    if (!userId || !userPassword) {
        res.status(400).json({ ok: false, message: 'Ningun Campo Debe Estar Vacio' })
        return
    }

    let existingUser = userAccounts.find(u => u.userId === userId)
    if (existingUser) {
        res.status(401).json({ ok: false, message: 'Este Usuario Ya Existe' })
    } else {
        userAccounts.push({ userId, userPassword })
        res.status(201).json({ ok: true, message: 'Se Ha registrado Con Exito' })
    }
});

app.put('/logout', (req, res) => {
    let user = userAccounts.find(u => u.sessionToken)

    if (user) {
        delete user.sessionToken
        res.clearCookie('token')
        res.status(200).json({ ok: true, message: 'Sesion Finalizada' })
    } else {
        res.status(401).json({ ok: false, message: 'Usuario No Encontrado' })
    }
})

app.get('/userInfo', (req, res) => {
    let token = req.cookies.token

    if (!token) {
        res.status(401).json({ ok: false, message: 'No Hay Una Sesion Activa' })
        return
    }

    let user = userAccounts.find(u => u.sessionToken === token)
    if (user) {
        res.status(200).json({ ok: true, message: 'Esta Informacion Es Secreta, Usuario: ', userId: user.userId, token: token })
    }
})

app.put('/login', (req, res) => {
    let token = req.cookies.token
    let { userId, userPassword } = req.body

    let loggedInUser = userAccounts.find(u => u.userId === userId && userPassword === u.userPassword && u.sessionToken)
    if (loggedInUser) {
        res.status(401).json({ ok: false, message: 'Ya Iniciaste Sesion' })
        console.log(token)
        return
    }
    console.log(userAccounts)
    
    let user = userAccounts.find(u => u.userId === userId && userPassword === u.userPassword && !u.sessionToken)
    
    if (user) {
        let token = createSessionToken()
        user.sessionToken = token;
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 10) //verificar
        });
        res.status(200)
        res.json({ ok: true, message: 'Logeado Correctamente' })
    }
    else {
        res.status(401).json({ ok: false, message: 'Usuario o Contraseña Incorrecta' })
    }
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000')
});