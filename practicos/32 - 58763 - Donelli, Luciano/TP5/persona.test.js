import request from 'supertest'; // Importa supertest
import app from './app'; // Importa tu aplicación Express

test("Borrar una persona (y retorna la persona borrada)", async () => {
    const persona = { id: 3, borrado: true }
    const res = await request(app).put("/personas").send(persona)
    expect(res.body.borrado).toBe(true)
    expect(res.body.actualizado).toBeDefined()
    expect(res.body.id).toBe(persona.id)
})
test("Borrar una persona (debe haber uno menos)", async () => {
    const persona = { id: 4, borrado: true }
    const leerAntes = await request(app).get("/personas").send()
    const antes = leerAntes.body.length
    const borrar = await request(app).put("/personas").send(persona)
    expect(borrar.body.id).toBe(persona.id)
    const leerDespues = await request(app).get("/personas").send()
    const despues = leerDespues.body.length

    expect(despues).toBe(antes - 1)
})