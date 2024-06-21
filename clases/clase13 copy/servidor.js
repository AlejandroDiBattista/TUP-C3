import express from 'express';
import morgan from 'morgan';
import Usuario from './controllers/usuario.js';
import cookieParser from 'cookie-parser';

const app = express();

app.disable('x-powered-by');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())

app.get('/usuarios', Usuario.listar);
app.post('/registrar', Usuario.registrar);
app.put('/login', Usuario.login);
app.put('/logout', Usuario.validar, Usuario.logout);
app.get('/info', Usuario.validar, Usuario.info);

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});	