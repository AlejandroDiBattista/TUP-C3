import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
    { actualizado: 0, apellido: "Camaño", borrado: false, edad: 30, id: 0, nombre: "Nicolas" },
    { actualizado: 0, apellido: "Carrizo", borrado: false, edad: 25, id: 1, nombre: "Nahuel" },
    { actualizado: 0, apellido: "Cervera", borrado: false, edad: 30, id: 2, nombre: "Diego" },
    { actualizado: 0, apellido: "Donelli", borrado: false, edad: 25, id: 3, nombre: "Luciano" },
    { actualizado: 0, apellido: "Ruiz", borrado: false, edad: 30, id: 4, nombre: "Augusto" }
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    try {
        // Filtra las personas en datos[] que no esten borradas y las guarda en DatosActualizados
        const DatosActualizados = datos.filter(dato => !dato.borrado)
        res.send(DatosActualizados)
    } catch (error) {
        console.log('error en GET /personas', error)
        res.status(500).json({ error: "Error interno del servidor" })
    }
});


app.put('/personas', (req, res) => {
    // Implementar PUT

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
          res.status(404).json({ message: 'Dato no encontrada' })
        }
      }
    } catch (error) {
      console.error('Error en PUT /personas:', error)
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  })

export default app