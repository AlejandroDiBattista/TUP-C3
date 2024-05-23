const contactos = [
    {
        id : 1, 
        nombre : "Aldana", 
        apellido : "Albarez",
        telefono : "54381000000"
    },
    {
        id : 2,
        nombre : "Adrian", 
        apellido : "Diaz",
        telefono : "54381200000"
    },
    {
        id : 3,
        nombre : "Benjamin", 
        apellido : "Gonzales",
        telefono : 54381111111
    },
    {
        id : 4, 
        nombre : "Belen", 
        apellido : "Rodriguez",
        telefono : 54381234567
    },
    {
        id : 5, 
        nombre : "Carmen", 
        apellido : "Acosta",
        telefono : 54381452893
    },
    {
        id : 6, 
        nombre : "Cecilia", 
        apellido : "Perez",
        telefono : 54381230000
    },
    {
        id : 7,
        nombre : "Dahiana", 
        apellido : "Flores",
        telefono : 54381010101
    },
    {
        id : 8, 
        nombre : "Daniel", 
        apellido : "Gomez",
        telefono : 54381020304
    },
    {
        id : 9, 
        nombre : "Emanuel", 
        apellido : "Ruiz",
        telefono : 54381987654
    },
    {
        id : 10, 
        nombre : "Emilia", 
        apellido : "Torres",
        telefono : 54381246810
    },
    {
        id : 11, 
        nombre : "Fernanda",
        apellido : "Sosa",
        telefono : 54381357911
    },
    {
        id : 12, 
        nombre : "Fabian",
        apellido : "Sanchez",
        telefono : 54381000001
    },
    {
        id : 13, 
        nombre : "Gabriel",
        apellido : "Hernandez",
        telefono : 54381001001
    },
    {
        id : 14, 
        nombre : "Giuliana",
        apellido : "Aguilares",
        telefono : 54381222222
    },
    {
        id : 15, 
        nombre : "Doc",
        apellido : "Hudson",
        telefono : 19510001957
    },
    {
        id : 16, 
        nombre : "Diane",
        apellido : "Nguyen",
        telefono : 19319803030
    }
]

const Agenda = () =>  (
    
    <div id="main">
        
        {contactos.map(contacto =>
        <div className="contenedor">
            <div className="tarjeta">
                <h2>Contacto {contacto.id}</h2>
                <div className="contenido">
                <ul>
                    <li><img id="perfil" src=".\profile-picture-black.jpg" alt="" width={100} height={100} /></li>
                    <div className="informacion">
                        <li><b>Nombre:</b> {contacto.nombre}</li>
                        <li><b>Apellido:</b> {contacto.apellido}</li>
                        <li><b>Telefono:</b> {contacto.telefono}</li>
                    </div>
                </ul>
                </div>
            </div>
        </div>

        )}
    </div>
)


ReactDOM.render(<Agenda />, document.getElementById('root'))