import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
    { id: 1, nombre: "Maria", apellido: "Gonzalez", edad: 28, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Carlos", apellido: "Lopez", edad: 34, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Ana", apellido: "Martinez", edad: 22, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Luis", apellido: "Perez", edad: 45, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Juana", apellido: "Ramirez", edad: 30, borrado: false, actualizado: Date.now() }
];

// Obtener todas las personas no borradas
app.get('/personas', (req, res) => {
    const personasNoBorradas = personas.filter(persona => !persona.borrado);
    res.status(200).json(personasNoBorradas);
});

// Crear o actualizar una persona
app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    // Validar si se proporcionan todos los campos necesarios al crear una nueva persona
    if (!id && (!nombre || !apellido || !edad)) {
        return res.status(400).json({ error: 'Todos los campos son requeridos para crear una nueva persona.' });
    }

    // Verificar si la persona ya existe
    const existingPersonaIndex = personas.findIndex(persona => persona.id === id);

    if (existingPersonaIndex !== -1) {
        // Actualizar persona existente
        const existingPersona = personas[existingPersonaIndex];
        existingPersona.nombre = nombre;
        existingPersona.apellido = apellido;
        existingPersona.edad = edad;
        existingPersona.borrado = borrado !== undefined ? borrado : existingPersona.borrado;
        existingPersona.actualizado = Date.now();

        return res.status(201).json(existingPersona);
    } else if (id) {
        return res.status(404).json({ error: 'Persona no encontrada.' });
    } else {
        // Crear una nueva persona
        const newId = personas.length > 0 ? Math.max(...personas.map(persona => persona.id)) + 1 : 1;
        const newPersona = { id: newId, nombre, apellido, edad, borrado: false, actualizado: Date.now() };
        personas.push(newPersona);
        return res.status(201).json(newPersona);
    }
});

// Borrar una persona
app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    const personaIndex = personas.findIndex(persona => persona.id === parseInt(id));

    if (personaIndex !== -1) {
        const persona = personas[personaIndex];
        persona.borrado = true;
        persona.actualizado = Date.now();
        res.status(201).json(persona);
    } else {
        res.status(404).json({ error: 'Persona no encontrada.' });
    }
});

export default app;
