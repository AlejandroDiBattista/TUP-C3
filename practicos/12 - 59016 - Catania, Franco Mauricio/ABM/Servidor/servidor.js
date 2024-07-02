import express from "express";
import Agenda from "./routers/agenda.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/contactos", Agenda);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");;
});

