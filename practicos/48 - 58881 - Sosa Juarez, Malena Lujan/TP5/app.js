import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let personas = [
    { id: 1, nombre: 'Ana', apellido: 'Martínez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Carlos', apellido: 'López', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'José', apellido: 'González', edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Laura', apellido: 'Pérez', edad: 21, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Sofía', apellido: 'Ramírez', edad: 28, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const activas = personas.filter(persona => !persona.borrado);
    res.status(200).json(activas);
});

app.put('/personas', (req, res) => {
    const personaNueva = req.body;

    if (!personaNueva.id) {
        const idNuevo = personas.length ? Math.max(...personas.map(p => p.id)) + 1 : 1;
        personaNueva.id = idNuevo;
        personaNueva.borrado = false;
        personaNueva.actualizado = Date.now();
        personas.push(personaNueva);
        res.status(201).json({ id: idNuevo });
    } else {
        const indicePersona = personas.findIndex(p => p.id === personaNueva.id);
        if (indicePersona !== -1) {
            personas[indicePersona] = { ...personas[indicePersona], ...personaNueva, actualizado: Date.now() };
            res.status(201).json(personas[indicePersona]);
        } else {
            res.status(404).json({ mensaje: 'Persona no encontrada' });
        }
    }
});

app.delete('/personas/:id', (req, res) => {
    const idPersona = parseInt(req.params.id);
    const indicePersona = personas.findIndex(p => p.id === idPersona);
    if (indicePersona !== -1) {
        personas[indicePersona].borrado = true;
        personas[indicePersona].actualizado = Date.now();
        res.status(201).json(personas[indicePersona]);
    } else {
        res.status(404).json({ mensaje: 'Persona no encontrada' });
    }
});

export default app
