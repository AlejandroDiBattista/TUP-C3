const Lista = [
    {
        id: 1,
        nombre: 'José',
        apellido: 'Devecchi',
        telefono: 3813316548,
        edad: 22
    },
    {
        id: 2,
        nombre: 'Matías',
        apellido: 'Orihuela',
        telefono: 3816547297,
        edad: 25
    },
    {
        id: 3,
        nombre: 'Néstor',
        apellido: 'Breitenbruch',
        telefono: 3815246789,
        edad: 29
    },
    {
        id: 4,
        nombre: 'Mateo',
        apellido: 'Coronel',
        telefono: 3816715924,
        edad: 32
    },
    {
        id: 5,
        nombre: 'Marcelo',
        apellido: 'Estigarribia',
        telefono: 3816525683,
        edad: 35
    },
    {
        id: 6,
        nombre: 'Guillermo',
        apellido: 'Acosta',
        telefono: 3811003569,
        edad: 31

    }

]
const Contactos = () => (
    <div id='main'>
        <h1>Mi Lista de Tarjetas de Presentación</h1>
        {Lista.map(contacto => 
        <div class="contacto">
            <div class="tarjeta">
                <li>Persona N°: <b>{contacto.id}</b>
                    <ul>Nombre y Apellido: {contacto.nombre} {contacto.apellido}</ul>
                    <ul>N° de Celular: {contacto.telefono}</ul>
                    <ul>Edad: {contacto.edad}</ul>
                </li>
            </div>
        </div>)}
    </div>
);


const App = () =>  (
    <div>
        <Contactos  />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))