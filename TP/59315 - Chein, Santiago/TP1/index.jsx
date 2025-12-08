const lista_contactos = [
    { id: 1, nombre: 'santiago', apellido: 'chein', telefono: '123456789' },
    { id: 2, nombre: 'lucas', apellido: 'Gómez', telefono: '987654321' },
    { id: 3, nombre: 'Pedro', apellido: 'Martínez', telefono: '456789123'}
];

function TarjetaContacto({ contacto }) {
    return (
        <div className="tarjeta-contacto">
            <h2>{contacto.nombre} {contacto.apellido}</h2>
            <p>ID: {contacto.id}</p>
            <p>Teléfono: {contacto.telefono}</p>
        </div>
    );
}

const Titulo = () => <h1>AGENDA</h1>

function ContactList() {
    return (
        <div id="main">
            <Titulo/>
            {lista_contactos.map(contacto => (
                <TarjetaContacto key={contacto.id} contacto={contacto} />
            ))}
        </div>
    );
}


ReactDOM.render(<ContactList/>, document.getElementById('root'));
