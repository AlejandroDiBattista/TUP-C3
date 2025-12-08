import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id:1, nombre:"Gonzalo", apellido:"Chaves", edad:29, borrar: false, actualizar: Date.now()},
    {id:2, nombre:"Franco", apellido:"Catania", edad:23, borrar: false, actualizar: Date.now()},
    {id:3, nombre:"Matias", apellido:"Cuevas", edad:28, borrar: false, actualizar: Date.now()},
    {id:4, nombre:"Mario", apellido:"Corral", edad:29, borrar: false, actualizar: Date.now()},
    {id:5, nombre:"Fabricio", apellido:"Delgado", edad:24, borrar: false, actualizar: Date.now()},
    // Datos de ejemplo   
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    res.status(200).json(datos.filter(persona => !persona.borrar))
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const{id, nombre, apellido, edad, borrar} = req.body

    if(id){
        const persona = datos.find(personas => personas.id === id)
        if (!persona) {
            return res.status(404).json({mensaje: "Persona no encontrada"})
        }

        Object.assign(persona, {
            nombre: nombre || personas.nombre,
            apellido: apellido || persona.apellido,
            edad: edad || persona.edad,
            borrar: borrar !== undefined? borrar: persona.borrar,
            actualizar: Date.now()
            })

            return res.status(201).json(persona)
        } else{
            const nuevaPersona ={
                id: datos.length ? Math.max(...datos.map(p => p.id)) +1 : 1,
                nombre, apellido, edad,
                borrar: false,
                actualizar: Date.now()
            }

            datos.push(nuevaPersona)

            res.status(201).json({id: nuevaPersona.id})
        }
})

export default app