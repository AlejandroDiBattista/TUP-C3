
const Contacto = ({ nombre, apellido, telefono, email }) => (
    <div id="contenedor">
        <div id="conctacto">

            <h3 >{nombre} {apellido}</h3>
            <p>{telefono}</p>
            <p>{email}</p>
        </div> </div>
)

const Agenda = () => (
    <div>
        <div id="Agenda"><h1>Bienvenido a mi Agenda</h1></div>
        <Contacto nombre="Lucas" apellido="Coronel" telefono="3815671213" email="Agustula@gmail.com" />
        <Contacto nombre="Jose" apellido="Cuellar" telefono="3815645664" email="Agustula@gmail.com" />
        <Contacto nombre="Guille" apellido="Diaz" telefono="3815646648" email="Agustula@gmail.com" />
        <Contacto nombre="Agustin" apellido="Tula" telefono="335454646" email="Agustula@gmail.com" />
        <div id="Agenda"><h3>Lucas Coronel Comisión 3 TPN1</h3></div>
    </div>

)


ReactDOM.render(<Agenda />, document.getElementById('root'))