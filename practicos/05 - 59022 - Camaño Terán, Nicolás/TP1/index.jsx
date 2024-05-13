const Lista = [
    {
        id: 1,
        nombre: "Nicolás",
        apellido: "Camaño",
        telefono: 3813572338
    },
    {
        id: 2,
        nombre: "Marcelo",
        apellido: "Gallardo",
        telefono: 3813572338
    },
    {
        id: 3,
        nombre: "Lionel",
        apellido: "Messi",
        telefono: 3813572338
    },
    {
        id: 4,
        nombre: "Enzo",
        apellido: "Perez",
        telefono: 3813572338
    },
    {
        id: 5,
        nombre: "Mauro Ezequiel",
        apellido: "Lombardo",
        telefono: 3813572338
    },
    {
        id: 6,
        nombre: "Tomas",
        apellido: "Campos",
        telefono: 3813572338
    },
]

const Contactos = () => (
    <div id='main'>
        <h1>Contactos</h1>
        {Lista.map(contacto => 
        <div class="contacto">
            <div class="tarjeta">
                <li>ID: <b>{contacto.id}</b>
                    <ul>Nombre completo: {contacto.nombre} {contacto.apellido}</ul>
                    <ul>Telefono: {contacto.telefono}</ul>
                </li>
            </div>
        </div>)}
    </div>
);

const App = () =>  (
    <div>
        <Contactos />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))