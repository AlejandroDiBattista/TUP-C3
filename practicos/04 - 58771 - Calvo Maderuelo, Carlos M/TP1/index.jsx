
const Persona = ({nombre, edad}) => <p>Hola, soy {nombre} y tengo {edad} años</p>
const Saludar = () => <h1>¡Hola, mundo!</h1>

const App = () => (
    <div>
        <Saludar />
        <Persona nombre="Juan" edad={30} />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))