const listado_de_contacto = [
    {
        id: 1,
        nombre: "Dave",
        apellido: "Mustain",
        telefono: 3815216778,
        email: "oasjdoas@gmail.com"
    },


    {
        id: 2,
        Nombre: "Juan",
        apellido: "Taddei",
        telefono: 3817847225,
        email: "saodkv993@gmail.com"
    },
    {
        id: 3,
        nombre: "Alexis",
        apellido: "Perez",
        telefono: 3813522127,
        email: "alexx993@gmail.com"
    },
    {
        id: 4,
        nombre: "Nahuel",
        apellido: "Diaz",
        telefono: 3816532121,
        email: "diaznahuel0600@gmail.com"
    },
    {
        id: 5,
        nombre: "Samuel",
        apellido: "Lopez",
        telefono: 3819987635,
        email: "sixteennine@gmail.com"
    }


]

const Listado = () => (
    <div id='main'>
        <h1>Listado</h1>
        {listado_de_contacto.map(contacto =>
            <div class="contacto">
                <div class="tarjeta">
                    <li>ID: <b>{contacto.id}</b>
                        <ul>Nombre y apellido: {contacto.nombre} {contacto.apellido}</ul>
                        <ul>Telefono: {contacto.telefono}</ul>
                        <ul>Email: {contacto.email}</ul>
                    </li>
                </div>
            </div>)}
    </div>
)

const App = () => (
    <div>
        <Listado />
    </div>

)

ReactDOM.render(<App />, document.getElementById('root'))