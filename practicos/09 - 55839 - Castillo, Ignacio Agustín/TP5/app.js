import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 0, nombre: "Luciana", apellido: "Perez", edad: 25, actualizado: 0, borrado: false },
    { id: 1, nombre: "Maria", apellido: "Lopez", edad: 23, actualizado: 0, borrado: false },
    { id: 2, nombre: "Milagros", apellido: "Gutierrez", edad: 21, actualizado: 0, borrado: false },
    { id: 3, nombre: "Juan", apellido: "Rodriguez", edad: 16, actualizado: 0, borrado: false },
    { id: 4, nombre: "Marta", apellido: "Alvares", edad: 49, actualizado: 0, borrado: false },
    { id: 5, nombre: "Pedro", apellido: "Solorsano", edad: 71, actualizado: 0, borrado: false },
]

app.get('/personas', (req, res) => {
    const datosF = datos.filter(dato => !dato.borrado)
    res.send(datosF)
});

app.put('/personas', (req, res) => {
    const data = req.body;

    if (data.id === undefined) {
        data.id = datos.length > 0 ? datos[datos.length - 1].id + 1 : 1
        datos.push(data)
        res.status(201).json(data)
    } else {
        const index = datos.findIndex(p => p.id === data.id)
        if (index !== -1) {
            datos[index] = {...datos[index], ...data}
            res.status(201).json(datos[index])
        } else {
            res.status(404).json({ message: 'Id not found' })
        }
    }
});
export default app