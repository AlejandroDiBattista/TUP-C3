import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Maria', apellido: 'Lopez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Pedro', apellido: 'Gomez', edad: 40, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Ana', apellido: 'Martinez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Luis', apellido: 'Rodriguez', edad: 28, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

app.put('/personas', (req, res) => {
    const nuevaPersona = req.body;
    if (!nuevaPersona.id) {
        const newId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        nuevaPersona.id = newId;
        nuevaPersona.borrado = false;
        nuevaPersona.actualizado = Date.now();
        datos.push(nuevaPersona);
        res.status(201).json({ id: newId });
    } else {
        const personaIndex = datos.findIndex(p => p.id === nuevaPersona.id);
        if (personaIndex !== -1) {
            if (nuevaPersona.borrado === true) {
                datos[personaIndex].borrado = true;
                datos[personaIndex].actualizado = Date.now();
                res.status(200).json(datos[personaIndex]);
            } else {
                datos[personaIndex] = { ...datos[personaIndex], ...nuevaPersona, actualizado: Date.now() };
                res.status(201).json(datos[personaIndex]);
            }
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
})

export default app