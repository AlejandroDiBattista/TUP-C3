const lista_contactos = [
    {id: 75, nombre: 'juan', apellido: 'garrincha', telefono: '3813675532'},
    {id: 86, nombre: 'lautaro', apellido: 'perez', telefono: '3818832424'},
    {id: 53, nombre: 'roberto', apellido: 'fagio', telefono: '3819654646'},
   
    
];

function ContactList(){
    return(
        <div id="main">
            <h1>Mi agenda</h1>
            {lista_contactos.map(contacto => (
         <div  key={contacto.id} className="tarjeta">
           <h2>{contacto.nombre} {contacto.apellido}</h2>
           <p>ID: {contacto.id}</p>
           <p>telefono: {contacto.telefono}</p>
         </div>

          ))}
            
        
        </div>
    );
}


ReactDOM.render(<ContactList />, document.getElementById('root'))