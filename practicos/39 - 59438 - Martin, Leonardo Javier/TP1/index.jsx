//const App = () =>  (
//    <div>
//        <h1>¡Hola, mundo!</h1>
//        <p>¡Bienvenidos a React!</p>
//    </div>
//)



const Personas = () => (
    <div>
        <h1>Agenda ~ Contactos </h1>
        <Agenda id= "1:" apellido = "Quito" nombre= "Esteban" celular= "777-888-999"/>
        <Agenda id= "2:" apellido = "Asthley" nombre= "Ricky" celular= "777-888-999"/>
        <Agenda id= "3:" apellido = "Lennon" nombre= "John" celular= "777-888-999"/>
        <Agenda id= "4:" apellido = "Alighieri" nombre= "Dante" celular= "777-888-999"/>
        <Agenda id= "5:" apellido = "Coelho" nombre= "Paolo" celular= "777-888-999"/>
        <Agenda id= "6:" apellido = "White" nombre= "Walter" celular= "777-888-999"/>
        <Agenda id= "7:" apellido = "Shaw" nombre= "Sebastian" celular= "777-888-999"/>
        <Agenda id= "8:" apellido = "Xavier" nombre= "Charles" celular= "777-888-999"/>
        <Agenda id= "9:" apellido = "Vi Britania" nombre= "Lelouch" celular= "777-888-999"/>
        <Agenda id= "10:" apellido = "Rintarou" nombre= "Okabe" celular= "777-888-999"/>
    </div>
)
//Preguntar por el error de los objetos juntos/separados 
const Agenda = ({id, nombre, apellido, celular}) => (
    <div>
        <h2>{id} {apellido} {nombre} <br></br>Nro de Celular: {celular}</h2>
    </div>
)

//Pd: Profe si lee esto, espero que le gusten las referencias en los nombres (?) no se me ocurrio que mas ponerle xD
ReactDOM.render(<Personas />, document.getElementById('root'))