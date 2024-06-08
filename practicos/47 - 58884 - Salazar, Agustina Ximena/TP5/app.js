import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let personas = [
    { id: 1, nombre: 'Elena', apellido: 'Hernández', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Alejandro', apellido: 'Gómez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Isabel', apellido: 'Rodríguez', edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Diego', apellido: 'Díaz', edad: 21, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Natalia', apellido: 'Sánchez', edad: 28, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const activas = personas.filter(persona => !persona.borrado);
    res.status(200).json(activas);
});

app.put('/personas', (req, res) => {
    const nuevaPersona = req.body;

    if (!nuevaPersona.id) {
        const nuevoId = personas.length ? Math.max(...personas.map(p => p.id)) + 1 : 1;
        nuevaPersona.id = nuevoId;
        nuevaPersona.borrado = false;
        nuevaPersona.actualizado = Date.now();
        personas.push(nuevaPersona);
        res.status(201).json({ id: nuevoId });
    } else {
        const personaIndex = personas.findIndex(p => p.id === nuevaPersona.id);
        if (personaIndex !== -1) {
            if (nuevaPersona.borrado === true) {
                personas[personaIndex].borrado = true;
                personas[personaIndex].actualizado = Date.now();
                res.status(200).json(personas[personaIndex]);
            } else {
                personas[personaIndex] = { ...personas[personaIndex], ...nuevaPersona, actualizado: Date.now() };
                res.status(201).json(personas[personaIndex]);
            }
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
})

export default app;
