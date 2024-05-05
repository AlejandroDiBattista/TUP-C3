// import datos from 'datos.js'
import Contacto from './demo/src/Contacto.jsx'
// console.log(datos)
const App = () =>  (
    <div>
        <h1>¡Hola, mundo!</h1>
        <p>¡Bienvenidos a React! </p>
        <Contacto />
        {/* <p>Hay {datos} contactos</p> */}
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))