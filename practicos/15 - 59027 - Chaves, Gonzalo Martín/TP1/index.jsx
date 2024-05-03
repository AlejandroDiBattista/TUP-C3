const contactos = [
{id:10, nombre: "Gonzalo ", apellido: "Chaves", Telefono: "381-6770006"},
{id:20, nombre: "Amir ", apellido: "Chein", Telefono: "381-4133467"},
{id:30, nombre: "Santiago ", apellido: "Chein", Telefono: "381-6125880"},
{id:40, nombre: "Juan ", apellido: "Coronel", Telefono: "381-5853419"},
{id:50, nombre: "Gustavo ", apellido: "Cecilia", Telefono: "381-5245764"},
];


const Contacto = ({id, nombre, apellido, telefono})=>
(
    <div className="cont">
        <div className="datos">
        <h3 id="id2">{id} <br/></h3>
        <h3 id="nombre">{apellido} {nombre} </h3>
        <h3 id="telefono">{telefono}</h3>
        </div>
    </div>
);


const App = () =>  (
    <div className="principal">
        <h1>TARJETAS DE CONTACTOS!</h1>     
        {
        contactos.map(contactos => (
        <Contacto
            id = {contactos.id}
            nombre = {contactos.nombre}
            apellido = {contactos.apellido}
            telefono = {contactos.Telefono}
        />))
        }
    </div>
);


ReactDOM.render(<App />, document.getElementById('root'));