import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
   { id: 1, nombre: "Sebastian", apellido: "Cruz", edad: 20, borrado: false, actualizado: Date.now()}, 
   { id: 2, nombre: "Mario", apellido: "Corral", edad:29, borrado: false, actualizado: Date.now()},
   { id: 3, nombre: "Gonzalo", apellido: "Chavez", edad: 28, borrado: false, actualizado: Date.now()},
   { id: 4, nombre: "Fabricio", apellido: "Delgado", edad: 24, borrado: false, actualizado: Date.now()},
   { id: 5, nombre: "Franco", apellido: "Catania", edad: 26, borrado: false, actualizado: Date.now()}
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personas = datos.filter(personas => !personas.borrado)
    res.status(200).json(personas)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body
    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id)
        if (index !== -1) {
            datos [index] = { ...datos[index], ...persona, actualizado: Date.now()}
            return res.status(201).json(datos[index])
        } else {
            return res.status(404).json({error: 'Persona no encontrada'})
        }
    } else {
        persona.id = datos.length + 1
        persona.actualizado = Date.now()
        persona.borrado = false 
        datos.push(persona)
        return res.status(201).json(persona)
    }
})

export default app