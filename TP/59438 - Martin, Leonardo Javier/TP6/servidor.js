import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});

const Usuarios = [
    { username: 'admin', password: 'admin' },
    { username: 'Test01', password: '333444' },
    { username: 'Test02', password: '333444' },
    { username: 'Test03', password: '333444' },
]; 

// Registrar
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

// Login - ON
app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const user = Usuarios.find((user) => user.username === nombreUsuario && user.password === contraseña); 
    if (!user) {
        return res.status(401).json({ error: 'User o PW es incorrecto' });  
    }
    res.cookie('usuario', nombreUsuario, { maxAge: 999999, httpOnly: true }); 
    console.log('Inicio de sesión exitoso'); 
    console.log('Usuario logueado:', { username: nombreUsuario, password: contraseña });  
    res.status(200).json({ message: 'Usuario logueado exitosamente' }); 
});

// Logg-Off
app.post('/logout', (req, res) => {
    res.clearCookie('usuario'); 
    console.log('Usuario deslogueado');
    console.log('Sesión cerrada'); 


res.status(200).json({ message: 'Usuario deslogueado' }); 
});
