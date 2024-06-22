import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
from 'morgan';
const app = express();
const puerto = 3000;
app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos
const Usuarios = [
    { username: 'Mario', password: '97865' },
    { username: 'Camilo', password: '43523' },
    { username: 'Veronica', password: '13422' },
    { username: 'Gabriel', password: '13467' },
]; 
// Ruta de registro
app.post('/register', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const usuarioExiste = Usuarios.find((user) => user.username === nombreUsuario);  
    if (usuarioExiste) {
        return res.status(400).json({ error: 'Usuario existente' });  
    }
    Usuarios.push({ username: nombreUsuario, password: contraseña });  
    console.log('Usuario registrado:', { username: nombreUsuario, password: contraseña }); 
    res.status(200).json({ message: 'Usuario registrado' }); 
});
// Ruta de login
app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const user = Usuarios.find((user) => user.username === nombreUsuario && user.password === contraseña); 
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });  
    }
    res.cookie('usuario', nombreUsuario, { maxAge: 900000, httpOnly: true }); 
    console.log('Inicio de sesión exitoso'); 
    console.log('Usuario logueado:', { username: nombreUsuario, password: contraseña });  
    res.status(200).json({ message: 'Usuario logueado correctamente' }); 
});
// Ruta de deslogueo
app.post('/logout', (req, res) => {
    res.clearCookie('usuario'); 
    console.log('Usuario deslogueado');
    console.log('Sesión cerrada'); 
res.status(200).json({ message: 'Usuario deslogueado correctamente' }); 
});
// Inicia el servidor y escucha en el puerto definido
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});

