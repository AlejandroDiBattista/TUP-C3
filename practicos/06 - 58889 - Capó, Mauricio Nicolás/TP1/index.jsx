
const Contactos = [
    {id:1, Nombre:"Raul ", Apellido:"Colombres", Telefono: "381 3234545", Ciudad: "Tucuman"},
    {id:2, Nombre:"Tomy ", Apellido:"Maguire", Telefono: "3717 6282547", Ciudad: "Formosa"},
    {id:3, Nombre:"Luis ", Apellido:"Fonsi", Telefono: "0387 3234545", Ciudad: "Salta"},
    {id:4, Nombre:"Daddy ", Apellido:"Yankee", Telefono: "342 3234545", Ciudad: "Santa Fe"}
    
];

const Contacto = ({Nombre, Telefono,Ciudad,Apellido}) => (
   
    <div className="Informacion">
    <ul>
       <p>
        <li><b>Nombre: </b>{Nombre}</li><br/>
        <li><b>Apellido: </b>{Apellido}</li><br/>
        <li><b>Telefono: </b> {Telefono}</li><br/>
        <li><b>Ciudad: </b>{Ciudad} </li>
        </p>
    </ul>
    </div>
);

ReactDOM.render( 
    <div>
        <h1>Contactos</h1>
    {Contactos.map(contacto => (
    <Contacto
        key={contacto.id}
        Nombre={contacto.Nombre}
        Apellido={contacto.Apellido}
        Telefono={contacto.Telefono}
        Ciudad={contacto.Ciudad}
        />
    ))}
    </div>,
    document.getElementById('root')
);


