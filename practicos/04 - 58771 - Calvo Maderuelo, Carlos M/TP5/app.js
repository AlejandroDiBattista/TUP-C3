import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id: 1, nombre: "Matias", apellido: "Calvo", edad:20, borrado: false, actualizado: 0},
    {id: 2, nombre: "Melisa", apellido: "Chiara", edad:18, borrado: false, actualizado: 0},
    {id: 3, nombre: "Anita", apellido: "Calvo", edad:27, borrado: false, actualizado: 0},
    {id: 4, nombre: "Karina", apellido: "Diaz", edad:65, borrado: false, actualizado: 0},
    {id: 5, nombre: "Mario", apellido: "Calvo", edad:68, borrado: false, actualizado: 0}
]

app.get('/personas', (req, res) => {
    const noBorrados = datos.filter(persona => !persona.borrado);
    res.status(200).json(noBorrados)
});

app.put('/personas', (req, res) => {
    const {id, ...persona} = req.body

    if (id) {
        const encontrarIndex = datos.findIndex(p => p.id === id);
        if (encontrarIndex !== -1) {
            datos[encontrarIndex] = {...datos[encontrarIndex], ...persona};

            if (persona.borrado !== undefined) {
                datos[encontrarIndex].borrado = persona.borrado;
            }

            res.status(201).json(datos[encontrarIndex]);
        } else {
            res.status(404).json({error: 'No se encontro la persona...'});
        }
    } else {
        const nuevaId = datos.reduce((idMaxima, p) => Math.max(idMaxima, p.id), 0) + 1;
        const nuevaPersona = {id: nuevaId, ...persona, borrado:false, actualizado: 0};
        datos.push(nuevaPersona);
        res.status(201).json(nuevaPersona);
    }
})

export default app