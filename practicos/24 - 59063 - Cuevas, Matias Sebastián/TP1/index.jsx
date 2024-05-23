
const Agenda = (props) =>

(

  <div className="agenda">
    <ul className="lista">
      <li><b>nombre</b>:{props.nombre},{props.apelllido}</li>
      <li><b>telefono</b>:{props.telefono}</li>
      <li> <b>email</b>:{props.email}</li>
    </ul>

  </div>

)


const App = ({ id, nombre, apelllido, telefono, email }) => (


  <div className="agenda">
    <div className="nombre"> <h1>contactos</h1> </div>
    <br />

    < Agenda nombre="Matias" apelllido="cuevas" telefono="3813437567" email="matiascuevas2017@gmail.com" />
    < Agenda nombre="Sebastian" apelllido="cruz" telefono="3875036525" email="sebas200@gmail.com" />
    < Agenda nombre="Mario" apelllido="Corral" telefono="3875026526" email="mariocorral@gmail.com" />
    < Agenda nombre="Franco" apelllido="Catania" telefono="3876476622 " email="franco@mail.com" />,



  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

