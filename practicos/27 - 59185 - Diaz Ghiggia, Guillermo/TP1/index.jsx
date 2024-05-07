const CONTACTOS = [
    {id: 1001, nombre: 'Emiliano', apellido: 'Martinez', telefono: '+54 381 1234567'},
    {id: 1002, nombre: 'Lionel Andres', apellido: 'Messi', telefono: '+54 381 2345678'},
    {id: 1003, nombre: 'Alexis', apellido: 'Mac Allister', telefono: '+54 381 3456789'},
    {id: 1004, nombre: 'Giovani', apellido: 'Lo Celso', telefono: '+54 381 4567890'},
    {id: 1005, nombre: 'Enzo', apellido: 'Fernandez', telefono: '+54 381 5678901'}, 
]
const Agenda = () => (
    <div>
        <h1>AGENDA DE CONTACTOS</h1>
        <div className="agenda">
            {CONTACTOS.map(contacto => (
                <div key={contacto.id} className="card">
                     <div class="tools">
                    <div class="circle">
                        <span class="red box"></span>
                    </div>
                    <div class="circle">
                        <span class="yellow box"></span>
                    </div>
                    <div class="circle">
                        <span class="green box"></span>
                    </div>
                    </div>
                    
                    <div class="card__content">
                        <h2>{contacto.nombre} {contacto.apellido}</h2>
                        <p className="numero">{contacto.telefono}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
)

ReactDOM.render(<Agenda />, document.getElementById('root'))