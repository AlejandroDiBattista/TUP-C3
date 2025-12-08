import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
  { id: 1, nombre: "Carlos", apellido: "Fernandez", edad: 28, borrado: false, actualizado: Date.now() },
  { id: 2, nombre: "Ana", apellido: "Lopez", edad: 22, borrado: false, actualizado: Date.now() },
  { id: 3, nombre: "Sofia", apellido: "Martinez", edad: 32, borrado: false, actualizado: Date.now() },
  { id: 4, nombre: "Diego", apellido: "Garcia", edad: 45, borrado: false, actualizado: Date.now() },
  { id: 5, nombre: "Valeria", apellido: "Rodriguez", edad: 50, borrado: false, actualizado: Date.now() }
];

app.use(express.json());
app.use(cors());

app.get('/personas', (req, res) => {
  const personasNoBorradas = personas.filter(persona => !persona.borrado);
  res.status(200).json(personasNoBorradas);
});

app.put('/personas', (req, res) => {
  const { id, nombre, apellido, edad, borrado } = req.body;

  if (id) {
    const personaExistente = personas.find(persona => persona.id === id);

    if (!personaExistente) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    personaExistente.nombre = nombre || personaExistente.nombre;
    personaExistente.apellido = apellido || personaExistente.apellido;
    personaExistente.edad = edad || personaExistente.edad;
    personaExistente.borrado = borrado !== undefined ? borrado : personaExistente.borrado;
    personaExistente.actualizado = Date.now();

    return res.status(200).json(personaExistente);
  } else {
    const nuevaPersona = {
      id: personas.length ? Math.max(...personas.map(p => p.id)) + 1 : 1,
      nombre,
      apellido,
      edad,
      borrado: false,
      actualizado: Date.now()
    };

    personas.push(nuevaPersona);

    res.status(201).json({ id: nuevaPersona.id });
  }
});

export default app;