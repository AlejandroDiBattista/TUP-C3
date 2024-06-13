import express from 'express';
import morgan from 'morgan';
import CookieParser from 'cookie-parser';
import usuario from './routers/usuario.router.js';

const app = express();
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(express.json());
app.use(CookieParser());
app.use(usuario)

app.use(express.static('public'));

app.get('/poner', (req, res) => {
    res.cookie('mensaje', 'Esto lo acabo de escribir'
        , { expires: new Date(Date.now() + 1000 * 5) });
    
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000");
});	

