const Contacto = ({id, nombre, apellido, telefono}) =>(
    <div id="contenedor">
        <div id="Agenda">
            <p id="id2">{id}</p>
            <h3 id="Nombre"> {nombre} {apellido} </h3>
            <p id="telefono">  {telefono}</p>
        </div>

    </div>
)

const Lista =() => (
    <div>
        <h2 id="titulo">Agenda de contactos</h2>
        <Contacto nombre={"José"} apellido={"Cuellar"} telefono={"3814646779"} id="1" />
        <Contacto nombre={"Martina"} apellido={"Castillo"} telefono={"38146436"} id="2" />
        <Contacto nombre={"Lucas"} apellido={"Coronel"} telefono={"381843847"} id="3" />
        <Contacto nombre={"Guille"} apellido={"Ghiggia"} telefono={"3810673664"} id="4" />
        <Contacto nombre={"Aguntin"} apellido={"Tula"} telefono={"381385405"} id="5" />
        <Contacto nombre={"Fabricio"} apellido={"Delgado"} telefono={"3824850965"} id="6"/>
    </div>
)
ReactDOM.render(<Lista />, document.getElementById('root'))