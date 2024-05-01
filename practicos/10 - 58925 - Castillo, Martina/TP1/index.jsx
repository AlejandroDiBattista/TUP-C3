const Contacto = ({ nombre, apellido, telefono, numero }) => (
    <div>
        <h2>Contacto {numero}</h2>
        <p>Nombre: {nombre}</p>
        <p>Apellido: {apellido}</p>
        <p>Telefono: {telefono}</p>
    </div>
)

let Personas = [
    {id: 1 , nombre : "Martina", apellido:"Castillo", telefono: 3810663963},
    {id: 2 , nombre : "Aldana", apellido:"Caffarena", telefono: 3810023963},
    {id: 3 , nombre : "Gustavo", apellido:"Perez", telefono: 38102381923},
    {id: 4 , nombre : "Fabrizio", apellido:"Diaz", telefono: 38122381639}
]


Personas.sort((a,b) => a.nombre.localeCompare(b.nombre))

const App = () => (
    <div className='contenedor'>
        <h1>Agenda</h1>
        <ul>
            {Personas.map((Persona, index) => (
                <li key={Persona.id}>
                    <Contacto
                        nombre={Persona.nombre}
                        apellido={Persona.apellido}
                        telefono={Persona.telefono}
                        numero={index+1}
                    />
                </li>
            ))}
        </ul>
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'))