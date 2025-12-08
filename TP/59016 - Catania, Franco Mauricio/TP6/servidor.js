
import express from 'express'; 
import cookieParser from 'cookie-parser'; 
import morgan from 'morgan'; 

const app = express(); 
const puerto = 3000; 

// Middleware
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.static('public')); 

// Array de objetos(Datos)
const Usuarios = [
    { username: 'franco', password: '12345' },
    { username: 'matias', password: '12345' },
    { username: 'mario', password: '12345' },
    { username: 'seba', password: '1234' },
]; 

// Ruta de registro
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

// Ruta de login
app.post('/login', (req, res) => {
    const { nombreUsuario, contraseña } = req.body; 
    const user = Usuarios.find((user) => user.username === nombreUsuario && user.password === contraseña); // 
    if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });  
    }
    res.cookie('usuario', nombreUsuario, { maxAge: 900000, httpOnly: true }); 
    console.log('Inicio de sesion exitoso'); //Mensaje de inicio de sesion exitosa
    console.log('Usuario logueado:', { username: nombreUsuario, password: contraseña });  
    res.status(200).json({ message: 'Usuario logueado correctamente' }); 
});

// Ruta de deslogueo
app.post('/logout', (req, res) => {
    res.clearCookie('usuario'); 
    console.log('Usuario deslogueado');
    console.log('Sesion cerrada'); 
    res.status(200).json({ message: 'Usuario deslogueado correctamente' }); 
});

 // Inicia el servidor y escucha en el puerto definido
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});
