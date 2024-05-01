

const Contactos=()=>
[
     {id:1, nombre:"", apelllido: "",  telefono, email:""},
      
]

  
const Agenda=({id,nombre,apelllido,telefono,email})=>

(
    
    <div className="agenda"> 
      <h4>{nombre} <b>{apelllido.toUpperCase()}</b></h4>
      <p>telefono: {telefono}</p>
      <p>email:{email}</p>
        </div>

)


const App = ({id,nombre,apelllido,telefono,email}) =>  (
    <div className="agenda">
    <h1 id="titulo" className="titulo" >Agenda de Contactos</h1>
  
    <br />
    <br />
    <br />
    <br />
     < Agenda  nombre="Matias" apelllido="cuevas" telefono="3813437567" email="matiascuevas2017@gmail.com" />
     < Agenda  nombre="Sebastian" apelllido="cruz" telefono="387 503-6525"  email="sebas200@gmail.com" />
     < Agenda  nombre="Mario" apelllido="Corral" telefono="387 502-6526" email="mariocorral@gmail.com" />
     < Agenda  nombre="Franco" apelllido="Catania" telefono="3876 47-6622 "email="franco@mail.com" />,
  


    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

