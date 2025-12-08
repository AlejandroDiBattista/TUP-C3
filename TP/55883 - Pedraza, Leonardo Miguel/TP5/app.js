import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let personas = [
    {actualizado: 0, apellido: "Gomez", borrado: false, edad: 20, id: 1, nombre: "Jose"},
    {actualizado: 0, apellido: "Zapata", borrado: false, edad: 24, id: 2, nombre: "Antonio"},
    {actualizado: 0, apellido: "Bolañoz", borrado: false, edad: 50, id: 3, nombre: "Roberto"},
    {actualizado: 0, apellido: "Banderas", borrado: false, edad: 19, id: 4, nombre: "Elena"},
    {actualizado: 0, apellido: "Franco", borrado: false, edad: 35, id: 5, nombre: "Matias"}
]

app.get('/personas', (req, res) => {
    res.json(personas)
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body

    if (id) {
        let persona = personas.find(p => p.id === id)
        if (persona) {
            if (borrado) {
                persona.borrado = true
                personas = personas.filter(p => p.id !== id)
                return res.status(201).json(persona)
            } else {
                persona.nombre = nombre
                persona.apellido = apellido
                persona.edad = edad
                persona.borrado = borrado
                persona.actualizado += 1
                return res.status(201).json(persona)
            }
        } else {
            return res.status(404).json({ error: 'Persona no encontrada' })
        }
    } else {
        const nuevoId = personas.length > 0 ? Math.max(...personas.map(p => p.id)) + 1 : 1
        const nuevaPersona = {
            id: nuevoId,
            nombre,
            apellido,
            edad,
            borrado: borrado || false,
            actualizado: 0
        }
        personas.push(nuevaPersona);
        return res.status(201).json(nuevaPersona)
    }
})

export default app
