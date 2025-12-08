import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
   {id:1,nombre:"Raul", apellido:"Fernandez",edad: 20, borrado:false, actualizado: 0 },
   {id:2,nombre:"Luis", apellido:"Alarcon",edad: 31, borrado:false, actualizado: 0 },
   {id:3,nombre:"Ana", apellido:"Spinetta",edad: 25, borrado:false, actualizado: 0 },
   {id:4,nombre:"Miguel", apellido:"Borja",edad: 19, borrado:false, actualizado: 0 },
   {id:5,nombre:"Flor", apellido:"Ortega",edad: 29, borrado:false, actualizado: 1 }
];

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    const personaI = datos.findIndex(p => p.id === id);

    if (id) {
        if (borrado !== undefined) {
            datos[personaI].borrado = borrado;

        } 
        if (personaI === -1) {
            return res.status(404).send({ error: 'no se encontro a la persona' });
            
        }else {
            datos[personaI] = { ...datos[personaI], nombre, apellido, edad, actualizado: datos[personaI].actualizado + 1 };
            return res.status(201).json(datos[personaI]);
        }
    }
    const PersonaNueva = { id: datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1, nombre, apellido, edad, borrado: false, actualizado: 1 };
    datos.push(PersonaNueva);
    res.status(201).json(PersonaNueva);
});

export default app