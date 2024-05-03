const nombre = "EMPRESA"

const Contacto = ({nombre, apellido, telefono, cargo}) => (
    <div className="contacto">
        <h3>{nombre.toUpperCase()} {apellido}</h3>
        <p> {cargo} </p>
        <p>Telefono: {telefono} </p> 
    </div>
)

const App = () =>  (
    <div id = "main">
        <h1>Bienvenido de vuelta a {nombre.toUpperCase()}!</h1>
        <p>¡Nuestros empleados! (: </p>
        <Contacto nombre = "Maira" apellido = "Martinez" cargo={"Directora Ejecutiva"} telefono = "123456789" /> <button>¡Conocer más!</button>
        <Contacto nombre = "Denisse" apellido = "Gomez" cargo={"Diseñadora Grafica"}  telefono = "098765421" /> <button>¡Conocer más!</button>
        <Contacto nombre = "Lautaro" apellido = "Juarez" cargo={"Gerente General"}  telefono = "292929292" /> <button>¡Conocer más!</button>
        <Contacto nombre = "Margarita" apellido = "Lopez" cargo={"Jefa Departamento Alumnos"}  telefono = "1010101010" /> <button>¡Conocer más!</button>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))