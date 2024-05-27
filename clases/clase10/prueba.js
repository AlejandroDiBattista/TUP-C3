app.use((req, res, next) => {
    const { nombre } = req.query;
    console.log("antes", req.query)
    if (nombre === "alejandro") {
        res.status(401)
        res.send("No autorizado")
    } else {
        next()
    }
    console.log("Middleware Despues")
})

app.get("/saludar", (req, res) => {
    console.log("QUERY", req.query)
    const { nombre, apellido } = req.query;
    res.send("GET saludar | Hola " + nombre + " " + apellido)
})

app.post("/saludar", (req, res) => {
    console.log("BODY 3", req.body)
    const { nombre, apellido } = req.query;
    res.send("POST saludar | Hola " + nombre + " " + apellido)
}
)

app.get("/saludar/:nombre/edad/:edad", (req, res) => {
    console.log("QUERY", req.query)
    console.log("PARAMS", req.params)
    const { nombre } = req.params;
    res.send("GET saludar/:nombre | Hola " + nombre)
})

app.all("/*", (req, res) => {
    console.log("QUERY", req.query)
    // console.log("BODY", req.body)
    res.send("ALL saludar | Hola Mundo")
})


