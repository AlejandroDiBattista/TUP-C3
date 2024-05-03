const App = () => (
    <div>
        <h1 className="Titulo">Lista de Contactos</h1>

        <p className="Titulo__Parrafo">Mi primer Trabajo Practico Laboratorio |||</p>
        <Contactos Nombre={"Sebastian"} Apellido={"Cruz"} Telefono={381456541} Correo={"bastiis_32@gmail.com"} id={32102434} />
        <Contactos Nombre={"Camilo"} Apellido={"Apaza"} Telefono={381456767} Correo={"camiuwu2@gmail.com"} id={43234543} />
        <Contactos Nombre={"Rocio"} Apellido={"Alvarez"} Telefono={381345545} Correo={"Robico_@gmamil.com"} id={34234323} />
        <Contactos Nombre={"Juan"} Apellido={"Mercedes"} Telefono={381684932} Correo={"juanaiquilador@gmail.com"} id={43243589} />
        <Contactos Nombre={"Matias"} Apellido={"Gomez"} Telefono={381405699} Correo={"matuto00@gmail.com"} id={98908732} />
    </div>
)
const Contactos = ({ Nombre, Apellido, Telefono, Correo, id }) => (
    <div className="caja_contenedor">
        <div className="contenedor">
            <h3 className="nombre">{Nombre} {Apellido}</h3>
            <h3 className="telefono">{Telefono}</h3>
            <p className="correo">{Correo}</p>
            <p className="id">id:{id}</p>
        </div>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
