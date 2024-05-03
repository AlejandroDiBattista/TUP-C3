const titulos = () => (
    <div>
        <h1>Agenda</h1>
    </div>
)

const Contacto = ({ nombre, apellido, teléfono }) => (
    <div className="Contactos">
        <h2>{nombre} <b>{apellido.toUpperCase()}</b></h2>
        <p>Telefono: {teléfono}</p>
    </div>
)

const Agenda = () => (
    <div className="div">
        <h1>AGENDA</h1>
        <Contacto nombre="Matias" apellido="Lucena" teléfono="3813156301" />
        <Contacto nombre="Julio" apellido="Lucena" teléfono="3815711858" />
        <Contacto nombre="Carina" apellido="Elias" teléfono="3814635690" />
        <Contacto nombre="Sofia" apellido="Lucena" teléfono="3816189852" />
        <Contacto nombre="Emiliano" apellido="Lucena" teléfono="3812080347" />
        <Contacto nombre="Javier" apellido="Lucena" teléfono="3815619317" />
        <Contacto nombre="Agustin" apellido="Elias" teléfono="2964529741" />
    </div>
)

ReactDOM.render(<Agenda />, document.getElementById('root'))