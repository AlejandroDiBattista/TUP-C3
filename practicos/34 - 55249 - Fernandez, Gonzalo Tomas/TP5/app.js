import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Julian', apellido: 'Rodrigéz', edad: 24, borrado: false, actualizado: 0 },
    { id: 2, nombre: 'Karen', apellido: 'Gonzaléz', edad: 22, borrado: false, actualizado: 2 },
    { id: 3, nombre: 'Gabriel', apellido: 'Santillan', edad: 21, borrado: false, actualizado: 4 },
    { id: 4, nombre: 'Lourdes', apellido: 'Olea', edad: 23, borrado: false, actualizado: 3 },
    { id: 5, nombre: 'Macarena', apellido: 'Sánchez', edad: 23, borrado: false, actualizado: 1 },
];

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasNoBorradas);
});

app.put('/personas', (req, res) => {
    const { id, ...persona } = req.body;

    if (id) {
        const index = datos.findIndex(p => p.id === id);
        if (index !== -1) {
            datos[index] = { ...datos[index], ...persona };

            if (persona.borrado !== undefined) {
                datos[index].borrado = persona.borrado;
            }

            res.status(201).json(datos[index]);
        } else {
            res.status(404).json({ error: 'Persona no encontrada' });
        }
    } else {
        const newId = datos.reduce((maxId, p) => Math.max(maxId, p.id), 0) + 1;
        const nuevaPersona = { id: newId, ...persona, borrado: false, actualizado: 0 };
        datos.push(nuevaPersona);
        res.status(201).json(nuevaPersona);
    }
});

export default app;
