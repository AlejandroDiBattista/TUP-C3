let ContactosLista = [
    { id: 1, nombre: "Lionel", apellido: "Messi", telefono: "2022" }, 
    { id: 2, nombre: "Diego", apellido: "Maradona", telefono: "1986" },
    { id: 3, nombre: "Ángel", apellido: "Di María", telefono: "2022" },
    { id: 4, nombre: "Gabriel", apellido: "Batistuta", telefono: "0" }, 
    { id: 5, nombre: "Daniel", apellido: "Passarella", telefono: "1978" },
    { id: 6, nombre: "Julián", apellido: "Álvarez", telefono: "2022" }, 
    { id: 7, nombre: "Alexis", apellido: "Mac Allister", telefono: "2022" }, 
    { id: 8, nombre: "Emiliano", apellido: "Martínez", telefono: "2022" },
    { id: 9, nombre: "Cristian", apellido: "Romero", telefono: "2022" },
    { id: 10, nombre: "Nicolás", apellido: "Otamendi", telefono: "2022" }
];
const TarjetaContacto = ({ contacto }) => (
    <div className="tarjeta-contacto">
                <div className="id-pelotita"> {contacto.id}</div>
          <h2>Nombre :{contacto.nombre} {contacto.apellido}</h2>
        <p>Teléfono: {contacto.telefono}</p>
    </div>
);



const Agenda = () => (
    <div>
        <h1>AGENDA</h1>
        <div className="contenedor-tarjetas">
            {ContactosLista.map(contacto => (
                <TarjetaContacto key={contacto.id} contacto={contacto} />
            ))}
        </div>
    </div>
);

ReactDOM.render(<Agenda />, document.getElementById('root'))