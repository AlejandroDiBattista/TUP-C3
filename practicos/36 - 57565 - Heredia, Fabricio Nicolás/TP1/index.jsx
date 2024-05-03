


let Lista_contactos = [
    {id:1, nombre: 'Lionel', apellido: 'Messi', telefono: 38164865},
    {id:2, nombre: 'Cristiano', apellido: 'Ronaldo', telefono: 381647895},
    {id:3, nombre: 'Enzo', apellido: 'Fernandez', telefono: 381615365},
    {id:4, nombre: 'Karim', apellido: 'Benzama', telefono: 38159355},
    {id:5, nombre: 'Gerard', apellido: 'Pique', telefono: 38169875},
    {id:6, nombre: 'kylian', apellido: 'Mbappe', telefono: 38489875},
    {id:7, nombre: 'Roman', apellido: 'Riquelme', telefono: 38135875},
    {id:8, nombre: 'iker', apellido: 'Casillas', telefono: 38187875},
    {id:9, nombre: 'Gonzalo', apellido: 'Montiel', telefono: 38134875},
    {id:9, nombre: 'Alonzo', apellido: 'Xavi', telefono: 38131875}

];

function renderizarContactos(){
    return Lista_contactos.map(contacto => (
        <div key={contacto.id} className="box_contactos">
            <p>Nombre: {contacto.nombre} {contacto.apellido}</p>
            <p>Telefono: {contacto.telefono}</p>

        </div>
    ));
};




const App = () =>  (
    <div>
        <h1>Agenta</h1>
       <div className="main_box"> {renderizarContactos()}</div>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))