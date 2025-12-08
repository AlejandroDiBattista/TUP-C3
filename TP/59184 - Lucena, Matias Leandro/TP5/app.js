import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

let datos = [
    { id: 1, nombre: "Matias", apellido: "Lucena", edad: 21, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Javier", apellido: "Milei", edad: 41, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "juan", apellido: "Diaz", edad: 23, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Fernando", apellido: "Robles", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Ruben", apellido: "Acosta", edad: 40, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaExistente = datos.find(p => p.id === id);

        if (!personaExistente) {
            return res.status(404).json({ mensaje: 'Persona no encontrada' });
        }

        personaExistente.nombre = nombre || personaExistente.nombre;
        personaExistente.apellido = apellido || personaExistente.apellido;
        personaExistente.edad = edad !== undefined ? edad : personaExistente.edad;
        personaExistente.borrado = borrado !== undefined ? borrado : personaExistente.borrado;
        personaExistente.actualizado = Date.now();

        return res.status(201).json(personaExistente);
    } else {
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevoId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };

        datos.push(nuevaPersona);

        return res.status(201).json(nuevaPersona);
    }
});

export default app;
