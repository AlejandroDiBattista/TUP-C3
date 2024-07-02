import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())


let datos = [
    { id: 1, nombre: "matias", apellido: "Cuevas", edad: 29, borrado: false, actualizado: 0 },
    { id: 2, nombre: "franco", apellido: "Catania", edad: 28, borrado: false, actualizado: 0 },
    { id: 3, nombre: "mario", apellido: "Garcia", edad: 27, borrado: false, actualizado:0 },
    { id: 4, nombre: "sebastian", apellido: "Cruz", edad: 19, borrado: false, actualizado:0 },
    { id: 5, nombre: "fabricio", apellido: "Delgado", edad: 20, borrado: false, actualizado: 0 }
]



app.get('/personas', (req, res) => {
  
res.status(200).json(datos.filter(persona => !persona.borrado))
})

app.put("/personas", (req, res) => {
  const dato = req.body

  if (dato.id === undefined) {
    dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
    dato.borrado = false
    datos.push(dato)
    res.status(201).json(dato);
  } else {
    const personaI = datos.findIndex((persona) => persona.id === dato.id);
    if (personaI !== -1) {
      datos[personaI] = { ...datos[personaI], ...dato }
      res.status(201).json(datos[personaI]);
    } else {
      res.status(404).json({ message: "Persona no encontrada" })
}
}
});




export default app