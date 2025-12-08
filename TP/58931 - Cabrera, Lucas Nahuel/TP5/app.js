import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Ana', apellido: 'Fernandez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Lucas', apellido: 'Rodriguez', edad: 22, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado)
    res.status(200).json(personasActivas)
})

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body

    if (id) {
        const personaIndex = datos.findIndex(persona => persona.id === id)

        if (personaIndex !== -1) {
            const persona = datos[personaIndex]

            if (borrado) {
                persona.borrado = true
            } else {
                if (nombre) persona.nombre = nombre
                if (apellido) persona.apellido = apellido
                if (edad) persona.edad = edad
                persona.actualizado = Date.now()
            }

            res.status(201).json(persona)
        } else {
            res.status(404).json({ message: 'Persona no encontrada.' })
        }
    } else {
        const nuevaPersona = {
            id: datos.length + 1, 
            nombre: nombre || '',
            apellido: apellido || '',
            edad: edad || null,
            borrado: false,
            actualizado: Date.now()
        }

        datos.push(nuevaPersona)
        res.status(201).json(nuevaPersona)
    }
})

export default app