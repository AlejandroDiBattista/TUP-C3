import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Raul", apellido: "Lopez", edad: 28, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Marcela", apellido: "Gonzales", edad: 39, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Lucas", apellido: "Fernandez", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Maria", apellido: "Disalvo", edad: 18, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Mario", apellido: "correa", edad: 36, borrado: false, actualizado: Date.now()}
]

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    if (id) {
        const personaIndex = datos.findIndex(persona => persona.id === id);

        if (personaIndex === -1) {
            return res.status(404).json({ mensaje: 'Persona no encontrada' });
        }

        datos[personaIndex] = {
            ...datos[personaIndex],
            nombre: nombre || datos[personaIndex].nombre,
            apellido: apellido || datos[personaIndex].apellido,
            edad: edad || datos[personaIndex].edad,
            borrado: borrado !== undefined ? borrado : datos[personaIndex].borrado,
            actualizado: Date.now()
        };

        return res.status(201).json(datos[personaIndex]);
    } else {
        const newPersona = {
            id: datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };

        datos.push(newPersona);

        res.status(201).json({ id: newPersona.id });
    }
});
export default app