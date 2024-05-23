const datos = [
    { id: 1, nombre: 'Juan',    apellido: 'Garrincha',  telefono: '3813675532' },
    { id: 2, nombre: 'Lautaro', apellido: 'Perez',      telefono: '3818832424' },
    { id: 3, nombre: 'Roberto', apellido: 'Fagio',      telefono: '3819654646' },
]

const Contacto = ({ nombre, apellido, telefono }) =>
    <div className="tarjeta">
        <h2>{nombre} {apellido}</h2>
        <p>Teléfono: {telefono}</p>
    </div>

const Agenda = ({ contactos }) =>
    <div id="main">
        <h1>Mi agenda</h1>
        {contactos.map(contacto => <Contacto key={contacto.id} {...contacto} />)}
    </div>

ReactDOM.render(<Agenda contactos={datos} />, document.getElementById('root'))