const Agenda = [
    { id: 1, nombre:"Diego", apellido:"Cervera", telefono:"381-637-2234"},
    { id: 2, nombre:"Marcelo", apellido:"Gallardo", telefono:"381-421-3734"},
    { id: 3, nombre:"Julian", apellido:"Alvarez", telefono:"381-912-2018"},
    { id: 4, nombre:"Maria", apellido:"Gonsalez", telefono:"381-352-8694"},
    { id: 5, nombre:"Francisco", apellido:"Sosa", telefono:"381-078-1522"},
    { id: 6, nombre:"Sofía", apellido:"Perez", telefono:"381-976-5262"},
    { id: 7, nombre:"Gerónimo", apellido:"Benavides", telefono:"381-164-8253"},
    { id: 8, nombre:"Gerardo", apellido:"Juarez", telefono:"381-747-4325"},
    { id: 9, nombre:"Lourdes", apellido:"Moreta", telefono:"381-626-2754"},
    { id: 10, nombre:"Martina", apellido:"Martinez", telefono:"381-537-5334"},
    { id: 11, nombre:"Florencia", apellido:"Buhic", telefono:"381-763-7484"},
    { id: 12, nombre:"Franco", apellido:"Chaile", telefono:"381-527-1953"},
    { id: 13, nombre:"Cecilia", apellido:"Viscarra", telefono:"381-922-7492"},
    { id: 14, nombre:"Mauro", apellido:"Zarate", telefono:"381-200-5221"},
    { id: 15, nombre:"Gonzalo", apellido:"Cabrera", telefono:"381-022-8885"}
]

const Tarjeta = () => (
    <div id='container'>
        <h1>Contactos</h1>
        {
            Agenda.map(contacto => 
            <div class="contenedor">
                <div class="tarjeta">
                    <h2>ID: <b>{contacto.id}</b></h2>
                    <p>Nombre: <b>{contacto.nombre} {contacto.apellido}</b> </p>
                    <p>Telefono: <b>{contacto.telefono}</b> </p>
                </div>
            </div>)
        }
    </div>
);

ReactDOM.render(<Tarjeta />, document.getElementById('root'))

/*
let Tarjeta = ({nombre,apellido,telefono}) => (
    <div>
        <h1>Agenda</h1>
        <div>
            <b><h2>Nombre:{nombre}, {apellido} </h2></b>
            <p>Telefono: {telefono}</p>
        </div>
        
    </div>
)
*/

