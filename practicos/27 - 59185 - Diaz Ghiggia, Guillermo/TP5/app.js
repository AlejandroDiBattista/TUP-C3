import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo 
    {id: 1000, nombre: 'Marcelo', apellido: 'Costa', edad: 24, actualizado: 0, borrado: false,},
    {id: 1001, nombre: 'Lucas', apellido: 'Cabrera', edad: 21, actualizado: 0, borrado: false},
    {id: 1002, nombre: 'Nahuel', apellido: 'Cervera', edad: 29, actualizado: 0, borrado: false},    
    {id: 1003, nombre: 'Diego', apellido: 'Octavio', edad: 43, actualizado: 0, borrado: false},
    {id: 1004, nombre: 'Nicolas', apellido: 'Perez', edad:18, actualizado: 0, borrado: false},
    {id: 1005, nombre: 'Pablo', apellido: 'Gonzalez', edad: 37, actualizado: 0, borrado: false},
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const datosFiltrados = datos.filter(d => !d.borrado)
    res.send(datosFiltrados)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const dato = req.body;

    if (dato.id === undefined) {
        dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
        dato.borrado = false;
        datos.push(dato);
        res.status(201).json(dato);
    } else {
        const persIndex = datos.findIndex (p => p.id === dato.id);
        if (persIndex !== -1) {
          datos[persIndex] = { ...datos[persIndex], ...dato };
          res.status(201).json(datos[persIndex]);
        } else {
          res.status(404).json({ error: 'Persona no encontrada' });
        }
 }

});

export default app;