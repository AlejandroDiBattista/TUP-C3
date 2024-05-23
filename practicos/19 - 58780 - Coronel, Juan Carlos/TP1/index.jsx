// lista de contactos 
const contactos = [
{id:1, nombre: 'maria julia', apellido: 'Mendez', telefono: '4225533' },
{id:2, nombre : 'pedro', apellido : 'Fernandez' , telefono : '4200033' },
{id:3, nombre : 'maria mercedez', apellido : 'Del Valle', telefono : '4200035' },
{id:4, nombre :'jose' , apellido : 'alvarez', telefono : '3815856772'},
{id:5, nombre :'jose maria' , apellido : 'vaca', telefono : '3233321'},
{id:6, nombre :'maria ' , apellido : 'jerez' , telefono : '432224'},
{id:7, nombre :'victoria',apellido :'Navarro',telefono: '4223625'}] 
// dentro de constante contacto ,coloco funcion flecha
const Contacto = ({nombre,apellido,telefono}) => (
    <div className="contacto">
        <h3>{nombre}<b>{apellido.toUpperCase()}</b></h3>
        <p>Telefono :{telefono}</p>
    </div>
);
// es funcion principal
const Agenda = () => (
    <div id="main">
        <h1>Agenda</h1>
        {contactos.map(contacto => (
            <Contacto
            key={contacto.id}
            nombre={contacto.nombre}
            apellido={contacto.apellido}
            telefono={contacto.telefono}/>
        ))}
    </div>
);
// se renderiza la funcion Agenda y muestra en el elemento
ReactDOM.render(<Agenda />, document.getElementById('root'))