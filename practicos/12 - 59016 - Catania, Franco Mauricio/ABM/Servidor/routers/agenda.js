import express from "express";
import Agenda from "../constrollers/agenda.js"; 

const router = express.Router();

router.get("/", Agenda.listar);
router.post("/", Agenda.crear);
router.delete("/:id", Agenda.borrar);
router.put("/:id", Agenda.actualizar);


export default router;


