const titulos = () =>  (
    <div>
        <h1>Agenda</h1>
    </div>
)

const Contacto = ({id, nombre, apellido, teléfono}) => (
    <div className="Contacto">
        <h2><b>{id}</b>{nombre} <b>{apellido.toUpperCase()}</b></h2>
        <p>Telefono: {teléfono}</p>
    </div>
)


const Agenda = () => (
    <div id="main">
        <h1>AGENDA</h1>
        <Contacto id= "1-" nombre = "Ignacio"  apellido= "Córdoba"  teléfono= "3815372894"/>
        <Contacto id= "2-" nombre = "Camila"   apellido= "Medina"   teléfono= "3816475847"/>
        <Contacto id= "3-" nombre = "Lucas"    apellido= "Ponce"    teléfono= "3815176256"/>
        <Contacto id= "4-" nombre = "Daniela"  apellido= "Alcallaga"teléfono= "3819375381"/>
        <Contacto id= "5-" nombre = "Lautaro"  apellido= "Ortiz"    teléfono= "3819841732"/>
        <Contacto id= "6-" nombre = "Nahuel"   apellido= "Valencia" teléfono= "3816691872"/>
        <Contacto id= "7-" nombre = "Martina"  apellido= "Navarro"  teléfono= "3818172771"/>
        <Contacto id= "8-" nombre = "Lourdes"  apellido= "Leal"     teléfono= "3819848393"/>
        <Contacto id= "9-" nombre = "Claudia"  apellido= "Sanchez"  teléfono= "3814342465"/>
        <Contacto id= "10-" nombre = "Luciano" apellido= "Gomez"    teléfono= "3818543832"/>
        <Contacto id= "11-" nombre = "Martin"  apellido= "Velasquez"teléfono= "3815542896"/>
        <Contacto id= "12-" nombre = "Tobias"  apellido= "Mercado"  teléfono= "3817365734"/>
        <Contacto id= "13-" nombre = "Mauro"   apellido= "Navarro"  teléfono= "3818863321"/>
        <Contacto id= "14-" nombre = "Iriel"   apellido= "Perez"    teléfono= "3819912393"/>
        <Contacto id= "15-" nombre = "Monica"  apellido= "Paz"      teléfono= "3813211349"/>
        <Contacto id= "16-" nombre = "Lucia"   apellido= "Diaz"     teléfono= "3812437787"/>
        <Contacto id= "17-" nombre = "Facundo" apellido= "Cuellar"  teléfono= "3810938340"/>
        <Contacto id= "18-" nombre = "Joaquin" apellido= "Salazar"  teléfono= "3810938340"/>
        <Contacto id= "19-" nombre = "Roberto" apellido= "Silva"    teléfono= "3810938340"/>
        <Contacto id= "20-" nombre = "Pedro"   apellido="Salvatierra" teléfono= "3810938340"/>
    </div>
)




ReactDOM.render(<Agenda />, document.getElementById('root'))