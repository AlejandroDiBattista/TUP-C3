// const express = require('express');
import express from "express"

const app = express();


// CRUD
// Create - Read - Update - Delete

// GET - POST - PUT - DELETE
//create -> POST /productos (json con los datos)
//read -> GET /productos (devuelve json con los datos)
//readAll -> GET /productos (devuelve json con los datos)
//update -> PUT /productos/:id (json con los datos a modificar)
//delete -> DELETE /productos/:id (devuelve json con los datos eliminados)
app.use(express.json())

// REST
let personas = [
    { id: 1, nombre: "Alejandro", apellido: "Gonzalez" },
    { id: 2, nombre: "Juan", apellido: "Perez" },
    { id: 3, nombre: "Maria", apellido: "Lopez" },
    { id: 4, nombre: "Pedro", apellido: "Gomez" }
]

// READ_ALL
app.get("/personas", (req, res) => {
    res.json(personas)
})

// READ
app.get("/personas/:id", (req, res) => {
    const { id } = req.params
    const persona = personas.find(persona => persona.id == id)
    if (persona) {
        res.json(persona)
    } else {
        res.status(404)
        res.send("Persona no encontrada")
    }
})
// CREATE
app.post("/personas", (req, res) => {
    const persona = req.body

    const id = Math.max(...personas.map(persona => persona.id)) + 1

    personas = [...personas, { id, ...persona }]
    res.json(personas)
})

// UPDATE
app.put("/personas/:id", (req, res) => {
    const { id } = req.params
    if (!personas.some(p => p.id == id)) {
        res.status(404)
        res.send("Persona no encontrada")
        return
    }
    const persona = req.body

    personas = personas.map(p => p.id == id ? { ...p, ...persona } : p)
    res.json(personas)
})
// DELETE
app.delete("/personas/:id", (req, res) => {
    const { id } = req.params
    personas = personas.filter(persona => persona.id != id)
    res.json(personas)
})

app.listen(3000, () => {
    console.log('Servidor en 3000');
    console.log("http://localhost:3000")
})
