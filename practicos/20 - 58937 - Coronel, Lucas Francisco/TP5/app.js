import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 0, nombre: "Jose", apellido: "Rodriguez", edad: 40, actualizado: 0, borrado: false },
    { id: 1, nombre: "Enrique", apellido: "Uria", edad: 22, actualizado: 0, borrado: false },
    { id: 2, nombre: "Jorge", apellido: "Uber", edad: 27, actualizado: 0, borrado: false },
    { id: 3, nombre: "Sofia", apellido: "Ramirez", edad: 31, actualizado: 0, borrado: false },
    { id: 4, nombre: "Josefina", apellido: "Juarez", edad: 48, actualizado: 0, borrado: false }
]

app.get('/personas', (req, res) => {
    const datosFiltrados = datos.filter(d => !d.borrado)
    res.send(datosFiltrados)
});

app.put('/personas', (req, res) => {
    const dato = req.body;

    if (dato.id === undefined) {
        dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1
        datos.push(dato)
        res.status(201).json(dato)
    } else {
        const personaIndex = datos.findIndex(p => p.id === dato.id)
        if (personaIndex !== -1) {
            datos[personaIndex] = {...datos[personaIndex], ...dato}
            res.status(201).json(datos[personaIndex])
        } else {
            res.status(404).json({ message: 'Id no encontrado' })
        }
    }
})

export default app