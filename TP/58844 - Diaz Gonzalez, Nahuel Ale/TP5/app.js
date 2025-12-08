import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json());
app.use(cors())

let datos = [
    { actualizado: 0, apellido: "Perez", borrado: false, edad: 30, id: 0, nombre: "Juana" },
    { actualizado: 0, apellido: "Gonzalez", borrado: false, edad: 25, id: 1, nombre: "Luis" },
    { actualizado: 0, apellido: "Lopez", borrado: false, edad: 30, id: 2, nombre: "Juan" },
    { actualizado: 0, apellido: "Gonzalez", borrado: false, edad: 25, id: 3, nombre: "María" },
    { actualizado: 0, apellido: "Perez", borrado: false, edad: 30, id: 4, nombre: "María" }
]

app.get('/personas', (req, res) => {
    try {
        const datosReales = datos.filter(dato => !dato.borrado)
        res.send(datosReales)
    } catch (error) {
        console.log('error en GET /personas', error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
});

app.put('/personas', (req, res) => {
    try {
        const dato = req.body;

        if (dato.id === undefined) {
            dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1
            datos.push(dato)
            res.status(201).json(dato)
        } else {
            const index = datos.findIndex(p => p.id === dato.id)
            if (index !== -1) {
                datos[index] = { ...datos[index], ...dato }
                res.status(201).json(datos[index])
            } else {
                res.status(404).json({ message: 'Dato no encontrado' })
            }
        }
    } catch (error) {
        console.error('Error en PUT /personas:', error)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
});

export default app