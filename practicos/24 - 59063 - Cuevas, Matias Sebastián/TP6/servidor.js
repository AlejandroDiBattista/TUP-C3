import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     
app.use(cookieParser());    
app.use(express.json());    
app.use(express.static('public')); 


const Usuarios = [
    { username: 'matias', password: '123' },
    { username: 'mauro', password: '123' },
    { username: 'sebas', password: '123' },
    { username: 'pedro', password: '123' },
]; 


app.post('/register', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const usuarioExiste = Usuarios.find((user) => user.username === nombreUsuario);  
    if (usuarioExiste) {
        return res.status(400).json({ error: 'El usuario ya existe' });  
    }
    Usuarios.push({ username: nombreUsuario, password: contraseña });  
    console.log('Usuario registrado:', { username: nombreUsuario, password: contraseña }); 
    res.status(200).json({ message: 'Usuario registrado correctamente' }); 
});


app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const user = Usuarios.find((user) => user.username === nombreUsuario && user.password === contraseña); // 
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });  
    }
    res.cookie('usuario', nombreUsuario, { maxAge: 500000, httpOnly: true }); 
    console.log('Inicio de sesion exitoso'); 
    console.log('Usuario logueado:', { username: nombreUsuario, password: contraseña });  
    res.status(200).json({ message: 'Usuario logueado correctamente' }); 
})

app.post('/logout', (req, res) => {
    res.clearCookie('usuario'); 
    console.log('Usuario deslogueado');
    console.log('Sesion cerrada'); 
    res.status(200).json({ message: 'Usuario deslogueado correctamente' }); 
})

app.listen(3000, () => {

    console.log('Servidor iniciado en http://localhost:3000');
});