import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: 1 },
    { id: 2, nombre: "Dario", apellido: "Gomez", edad: 20, borrado: false, actualizado: 0 },
    { id: 3, nombre: "Lionel", apellido: "Messi", edad: 36, borrado: false, actualizado: 1 },
    { id: 4, nombre: "Andres", apellido: "Diaz", edad: 20, borrado: false, actualizado: 0 },
    { id: 5, nombre: "Luis", apellido: "Garcia", edad: 67, borrado: false, actualizado: 1 }
]

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado))
})

app.put('/personas', (req, res) => {
    const persona = req.body

    if (!persona.id) {
        persona.id = datos.length + 1
        persona.borrado = false
        persona.actualizado = 1
        datos.push(persona)
        res.status(201).json(persona)
    } else {
        const index = datos.findIndex(p => p.id === persona.id)
        if (index === -1) {
            res.status(404).send('Persona no encontrada.')
        } else {
            if (persona.borrado === true) {
                datos[index].borrado = true
                datos[index].actualizado = 1
            } else {
                datos[index] = { ...datos[index], ...persona, actualizado: 1 }
            }
            res.status(201).json(datos[index])
        }
    }
})

export default app