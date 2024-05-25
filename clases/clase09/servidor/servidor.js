import express from 'express';

const app = express();


// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Ya estoy aqui');
});

app.get("/users", (req, res) => {
    res.json([
        { name: "Alejandro", email: "a@g.com", phone: "1223" }, 
        { name: "Marcela", email: "a@g.com", phone: "1223" } 
    ]);
  res.send("Estos son los usuarios");
});

// Servidor escuchando en el puerto 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
