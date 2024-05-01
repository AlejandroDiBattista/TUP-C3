const contactos = [
    {
        id: 1,
        nombre: "Sofia",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 2,
        nombre: "Lautaro",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 3,
        nombre: "Aylen",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 4,
        nombre: "Cristian",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 5,
        nombre: "Pamela",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 6,
        nombre: "Carolina",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 7,
        nombre: "Coral",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 8,
        nombre: "Leonel",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 9,
        nombre: "Matias",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 10,
        nombre: "Exequiel",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 11,
        nombre: "Mariela",
        apellido: "Carrizo",
        telefono: 123456789
    },
    {
        id: 10,
        nombre: "Exequiel",
        apellido: "Carrizo",
        telefono: 123456789
    }
];

const Agenda = () => (
    <div id='main'>
        <h1>Agenda</h1>
        {contactos.map(contacto => 
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
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))