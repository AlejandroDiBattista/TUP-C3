import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
  {
    id: 1,
    nombre: "Franco",
    apellido: "Catania",
    edad: 55,
    borrado: false,
    actualizado: 0,
  },
  {
    id: 2,
    nombre: "Marisol",
    apellido: "Catania",
    edad: 22,
    borrado: false,
    actualizado: 0,
  },
  {
    id: 3,
    nombre: "Mario",
    apellido: "Corral",
    edad: 27,
    borrado: false,
    actualizado: 0,
  },
  {
    id: 4,
    nombre: "Seba",
    apellido: "Cruz",
    edad: 19,
    borrado: false,
    actualizado: 0,
  },
  {
    id: 5,
    nombre: "Matias",
    apellido: "Cuevas",
    edad: 22,
    borrado: false,
    actualizado: 0,
  },
];

app.get("/personas", (req, res) => {
  res.status(200).json(datos.filter((persona) => !persona.borrado));
});

app.put("/personas", (req, res) => {
  const dato = req.body;

  if (dato.id === undefined) {
    dato.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
    dato.borrado = false;
    datos.push(dato);
    res.status(201).json(dato);
  } else {
    const personaIndex = datos.findIndex((persona) => persona.id === dato.id);
    if (personaIndex !== -1) {
      datos[personaIndex] = { ...datos[personaIndex], ...dato };
      res.status(201).json(datos[personaIndex]);
    } else {
      res.status(404).json({ message: "Persona no encontrada" });
    }
  }
});

export default app