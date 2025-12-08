const Contacto = ({ID, nombre, apellido, telefono, mail, puesto}) => (
    <div className="contact-card">
        <h3>ID: {ID}</h3>
        <h3>Nombre: {nombre}</h3> 
        <h3>Apellido: {apellido}</h3>
        <h3>Teléfono: {telefono}</h3>
        <h3>Mail: {mail}</h3>
    </div>
);

const Agenda = () =>  (
    <div className="agenda">
        <h1 className="h1-agenda">¡Bienvenidos a mi agenda!</h1>

        <div className="contactos-container">
            <Contacto ID="1" nombre="Juan" apellido="Perez" telefono="123456789" mail="
            Juan@mail.com"/>
            <Contacto ID="2"nombre="Pedro" apellido="Gomez" telefono="123456798" mail="
            Pedro@mail.com"/>
            <Contacto ID="3"nombre="Maria" apellido="Lopez" telefono="123456987" mail="
            Maria@mail.com"/>
        </div>

    </div>
);

ReactDOM.render(<Agenda />, document.getElementById('root'));