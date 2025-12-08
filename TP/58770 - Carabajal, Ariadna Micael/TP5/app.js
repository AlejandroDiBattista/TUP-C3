import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
  {
    id: 1,
    nombre: "Sofia",
    apellido: "Acosta",
    edad: 27,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 2,
    nombre: "Fabian",
    apellido: "Soria",
    edad: 21,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 3,
    nombre: "Lucia",
    apellido: "Aguirre",
    edad: 34,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 4,
    nombre: "Julian",
    apellido: "Rojas",
    edad: 30,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 5,
    nombre: "Hector",
    apellido: "Gonzales",
    edad: 55,
    actualizado: 0,
    borrado: false,
  },
  {
    id: 6,
    nombre: "Margarita",
    apellido: "Quinteros",
    edad: 63,
    actualizado: 0,
    borrado: false,
  },
];

app.get("/personas", (req, res) => {
  // Implementar GET_ALL
  try {
    const datosTotales = datos.filter((dato) => !dato.borrado);
    res.send(datosTotales);
  } catch (error) {
    console.log("Error en Implementar GET_ALL", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.put("/personas", (req, res) => {
  // Implementar PUT
  try {
    const dato = req.body;
    if (dato.id === undefined) {
      const nuevoId = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1;
      dato.id = nuevoId;
      datos.push(dato);
      res.status(201).json(dato);
    } else {
      const index = datos.findIndex((persona) => persona.id == dato.id);
      if (index !== -1) {
        datos[index] = { ...datos[index], ...dato };
        res.status(201).json(datos[index]);
      } else {
        res.status(404).json({ message: "Dato inexistente o no encontrado" });
      }
    }
  } catch {
    console.log("Error en Implementar PUT", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default app;
