import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {
        id: 1, nombre: "Paula",
        apellido: "Heredia",
        edad: 18,
        borrado: false,
        actualizado: 0,
    },
    {
        id: 2,
        nombre: "Maira",
        apellido: "Martinez",
        edad: 19,
        borrado: false,
        actualizado: 0,
    },
    {
        id: 3,
        nombre: "Denisse",
        apellido: "Salazar",
        edad: 21,
        borrado: false,
        actualizado: 0,
    },
    {
        id: 4,
        nombre: "Jesus",
        apellido: "Fonseca",
        edad: 27,
        borrado: false,
        actualizado: 0,
    },
    {
        id: 5,
        nombre: "Luisa",
        apellido: "Laprida",
        edad: 25,
        borrado: false,
        actualizado: 0,
    },
    {
        id: 6,
        nombre: "Guillermina",
        apellido: "Talagante",
        edad: 20,
        borrado: false,
        actualizado: 0,
    },
];

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    if (id) {
        const personaIndex = datos.findIndex(persona => persona.id === id);
        if (personaIndex === -1) {
            return res.status(404).json({ message: 'user not found' });
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
        const nuevoUsuario = {
            id: datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };

        datos.push(nuevoUsuario);

        res.status(201).json({ id: nuevoUsuario.id });
    }
});
export default app