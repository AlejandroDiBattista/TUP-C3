import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors())

let datos = [
    { actualizado: 0, apellido: "Ramírez", borrado: false, edad: 30, id: 0, nombre: "Julia" },
    { actualizado: 0, apellido: "Martínez", borrado: false, edad: 25, id: 1, nombre: "Pedro" },
    { actualizado: 0, apellido: "Sánchez", borrado: false, edad: 30, id: 2, nombre: "Laura" },
    { actualizado: 0, apellido: "Rodríguez", borrado: false, edad: 25, id: 3, nombre: "Carlos" },
    { actualizado: 0, apellido: "Gómez", borrado: false, edad: 30, id: 4, nombre: "María" }
]

app.get('/personas', (req, res) => {
    try {
        // Filtra las personas en datos[] que no esten borradas y las guarda en datosReales
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
            // Si no tiene ID, asignar uno nuevo
            dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1
            datos.push(dato)
            res.status(201).json(dato)
        } else {
            // Si tiene ID, actualizar los campos
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
