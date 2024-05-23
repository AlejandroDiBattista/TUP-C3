class Contacto {
    constructor(id, nombre, apellido, telefono) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
    }
}
const agenda = [
    new Contacto(1, "Homero Jay", "Simpson", "123123123"),
    new Contacto(2, "Goku", "Son", "321321321"),
    new Contacto(3, "Chuck", "Norris", "213213213"),
    new Contacto(4, "John", "Wick", "231231231"),
    new Contacto(5, "Rocky", "Balboa", "312312312"),
]

function MostrarAgenda(agenda) {
    return agenda.map(Contacto => (
        <ul key={Contacto.id}>
            <li><b>Id: </b> {Contacto.id}</li>
            <li><b>Nombre Completo: </b> {Contacto.nombre} {Contacto.apellido}</li>
            <li><b>Teléfono: </b>{Contacto.telefono}</li>
        </ul>
    ))
}
const App = () => (
    //el div tiene un id agendacontactos para poder modificar la apariencia con css
    <div id="agendacontactos">
        <h1>AGENDA DE CONTACTOS</h1>
        {MostrarAgenda(agenda)}
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))