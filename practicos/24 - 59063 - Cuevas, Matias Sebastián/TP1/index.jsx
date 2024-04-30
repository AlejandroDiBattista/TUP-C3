
const Contacto = ({nombre, apellido, telefono}) => (
    <div>
        <h2>Contacto</h2>
        <p>Nombre: {nombre}</p>
        <p>Apellido: {apellido}</p>
        <p>Telefono: {telefono}</p>
    </div>
)

class Persona {
    constructor(nombre, apellido, telefono) {
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
    }
}

let agenda = [
    new Persona("Matias", "Cuevas", 123456789),
    new Persona("Juan", "Perez", 987654321),
    new Persona("Maria", "Gomez", 456789123),
    { nombre: "Juan", apellido: "Perez", telefono: 987654321 },
]


const App = () => (
    < div >
    {
        agenda.map((contacto, index) => (
            <Contacto key={index} nombre={contacto.nombre} apellido={contacto.apellido} telefono={contacto.telefono} />
        ))
    }
    </div >
)

[1, 2, 3, 4].map(x => x * 10) //> [10, 20, 30, 40]
agenda.map(contacto => Contacto(contacto))
agenda.map(contacto.)
ReactDOM.render(<App />, document.getElementById('root'))