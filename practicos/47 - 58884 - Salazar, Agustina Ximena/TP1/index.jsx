const nombre = "Cliente";

const Contacto = ({id, nombre, apellido, telefono , Ocup}) => (
  <div className="contacto">
    <p>ID: {id} </p>
    <h3>{nombre} <b>{apellido.toUpperCase()}</b></h3>
    <p>{Ocup}</p>
    <p>Telefono: {telefono}</p>
  </div>
);

const Titulo = () => <h1>★Lista de Contactos★</h1>;

const Agenda = () => (
  <div id="main">
    <Titulo />
    <h1>Hola, {nombre.toUpperCase()}</h1>
    <p>Comunicate con osotros</p>
    <Contacto nombre="Agustina" apellido="Salazar" Ocup="CEO de la empresa." telefono="123456789" id="1"/>
    <Contacto nombre="Ramón" apellido="Ramirez" Ocup= "Supervisor." telefono="987654321" id="2"/>
    <Contacto nombre="Isaias" apellido="Velazquez" Ocup="Director de Marketing." telefono="678954321" id="3" />
  </div>
);

ReactDOM.render(<Agenda/>, document.getElementById('root'));