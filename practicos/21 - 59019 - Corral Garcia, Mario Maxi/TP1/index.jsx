const contactos = () =>
    [
        { id: 1, Nombre: "", Apellido: "", Telefono: "", email: "" },
    ]
const Agenda = ({ id, Nombre, Apellido, Telefono, email }) =>
(
    <div className="agendaa">
        <h4>{Nombre}<b>{Apellido.toUpperCase()}</b></h4>
        <p>Telefono:{Telefono}</p>
        <p>email:{email}</p>
    </div>
)

const App = ({ _id, Nombre, Apellido, Telefono, email }) => (
    <div className="agenda">
        <h1 id="titulos" className="titulos">Agenda de contactos</h1>
        <br />
        <Agenda Nombre="Franco " Apellido="Catania" Telefono="3876155625" email="cataniafranco@gmail.com" />
        <Agenda Nombre="Matias " Apellido="Cuevas" Telefono="38154446" email="matiascuevas@gmail.com" />
        <Agenda Nombre="sebastian " Apellido="Cruz" Telefono="38855555556" email="sebascruz@gmail.com" />
        <Agenda Nombre="Mario " Apellido="Corral" Telefono="3875026526" email="corralgarcia94@gmail.com" />,
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))