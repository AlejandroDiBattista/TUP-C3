const Contactos = ({ID, nombre, apellido, telefono, mail, puesto}) => (
    <div className="contact-card">
        <h3>ID: {ID}</h3>
        <h3>Nombre: {nombre}</h3> 
        <h3>Apellido: {apellido}</h3>
        <h3>Telefono: {telefono}</h3>
        <h3>Mail: {mail}</h3>
        <h3>Puesto: {puesto}</h3>
    </div>
)

const Agenda = () => (
    <div className="agenda">
        <h1>¡Hola, Jefe!</h1>
        <p>Estas son los datos de contacto de sus empleados</p>
        <br />
        <div className="contactos-container">
            <h2>Servicio al Cliente</h2>
            <Contactos ID="1" nombre="Juan" apellido="Perez" telefono="123456789" mail="
            mail@mail.com" puesto="atención al cliente"/>
            <Contactos ID="2"nombre="Pedro" apellido="Gomez" telefono="987654321" mail="
            mail@mail.com" puesto="atención al cliente"/>
            <Contactos ID="3"nombre="Maria" apellido="Lopez" telefono="123456789" mail="
            mail@mail.com" puesto="atención al cliente"/>
            <br />

            <h2>Marketing y Publicidad</h2>
            <Contactos ID="4"nombre="Santiago" apellido="García" telefono="123456789" mail="
            mail@mail.com" puesto="marketing digital"/>
            <Contactos ID="5"nombre="Maira " apellido="Martínez" telefono="987654321" mail="
            mail@mail.com" puesto="Especialista en contenido"/>
            <Contactos ID="6"nombre="Diego" apellido="Rodríguez" telefono="123456789" mail="
            mail@mail.com" puesto="Especialista en redes sociales"/>
            <br />

            <h2>Operaciones y Logística</h2>
            <Contactos ID="7"nombre="Carla" apellido="Gómez" telefono="123456789" mail="
            mail@mail.com" puesto="Gerente de operaciones de comercio electrónico"/>
            <Contactos ID="8"nombre="Leandro " apellido="Sueldo" telefono="987654321" mail="
            mail@mail.com" puesto="Gerente de relaciones con proveedores"/>
            <Contactos ID="9"nombre="Laura " apellido="Ruiz" telefono="123456789" mail="
            mail@mail.com" puesto="Especialista en logística inversa"/>
            <br />

            <h2>Gestión de Proyectos</h2>
            <Contactos ID="10"nombre="Martín " apellido="Fernández" telefono="123456789" mail="
            mail@mail.com" puesto="Gerente de producto"/>
            <Contactos ID="11"nombre="Sofía" apellido="Rodríguez" telefono="987654321" mail="
            mail@mail.com" puesto="Gerente de proyectos"/>
            <Contactos ID="12"nombre="Juan " apellido="Martínez" telefono="123456789" mail="
            mail@mail.com" puesto="Especialista en conversión y optimización de la tasa de conversión"/>
            <br />

            <h2>Análisis y Datos</h2>
            <Contactos ID="13"nombre="Valentina " apellido="Gómez" telefono="123456789" mail="
            mail@mail.com" puesto="Analista de datos"/>
            <Contactos ID="14"nombre="Cuellar" apellido="Elias" telefono="987654321" mail="
            mail@mail.com" puesto="Analista de seguridad informática"/>
            <Contactos ID="15"nombre="Camila  " apellido="Pérez " telefono="123456789" mail="
            mail@mail.com" puesto="Analista de precios y competencia"/>
            <br />

            <h2>Diseño y Experiencia del Usuario(UX/UI)</h2>
            <Contactos ID="16"nombre="Facundo" apellido="López" telefono="123456789" mail="
            mail@mail.com" puesto="Especialista en experiencia de usuario (UX)"/>
            <Contactos ID="17"nombre="Florencia" apellido="Torres" telefono="987654321" mail="
            mail@mail.com" puesto="Especialista en interfaz de usuario (UX)"/>
            <Contactos ID="18"nombre="Agustina " apellido="Diaz" telefono="123456789" mail="
            mail@mail.com" puesto="Diseñador gráfico"/>
            <br />

            <h2>Desarrollo y Tecnología</h2>
            <Contactos ID="19" nombre="Renata" apellido="Jimenez" telefono="123456789" mail="
            mail@mail.com" puesto="Desarrollador web frontend"/>
            <Contactos ID="20" nombre="Guillermina" apellido="Gomez" telefono="987654321" mail="
            mail@mail.com" puesto="Desarrollador web backend"/>
            <Contactos ID="21" nombre="Pablo" apellido="Valenzuela" telefono="123456789" mail="
            mail@mail.com" puesto="Desarrollador web frontend/backend"/>
        </div>
    </div>
)

ReactDOM.render(<Agenda />, document.getElementById('root'))