import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
    { id: 1, nombre: "Lucas", apellido: "Castro", edad: 23, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Martin", apellido: "Guzman", edad: 21, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Gaspar", apellido: "Lennor", edad: 33, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Melina", apellido: "Alvarez", edad: 27, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Lucrecia", apellido: "Peralta", edad: 18, borrado: false, actualizado: Date.now() },
    { id: 6, nombre: "Leonel", apellido: "Messi", edad: 36, borrado: false, actualizado: Date.now() },
    { id: 7, nombre: "Fabricio", apellido: "Gutierrez", edad: 39, borrado: false, actualizado: Date.now() },
]

    // Implementar GET_ALL
    app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
    });


    // Implementar PUT
    app.put('/personas', (req, res) => {
        const { id, nombre, apellido, edad, borrado } = req.body;
      
        if (id) {
          const personaIndex = datos.findIndex(persona => persona.id === id);
      
          if (personaIndex === -1) {
            return res.status(404).json({ message: 'No se encontro la Persona' });
          }
      

          datos[personaIndex] = {
            ...datos[personaIndex],
            nombre: nombre || datos[personaIndex].nombre,
            apellido: apellido || datos[personaIndex].apellido,
            edad: edad || datos[personaIndex].edad,
            borrado: borrado !== undefined ? borrado : datos[personaIndex].borrado,
            actualizado: Date.now()
          };
      
          
          return res.status(201).json(datos[personaIndex]);
        } else {
          const newPersona = {
            id: datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
          };
      
          datos.push(newPersona);
      
          res.status(201).json({ id: newPersona.id });
        }
      });


export default app