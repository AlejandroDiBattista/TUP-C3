const Contacto = ({id, nombre, apellido, telefono}) => (

    <div id= "contenedor">
      <div id="Agenda">
      <p id="id2"> {id} </p>
      <h3 id="Nombre"> {nombre}  {apellido} </h3>
      <p id= "telefono"> {telefono} </p>
  
      </div>
    </div>

)

const Lista = () => (
<div>
      <h2 id="titulo"> AGENDA DE CONTACTOS</h2>
      <Contacto nombre={ "Agustin"} apellido={"Tula"} telefono={3814491031} id="1" />
      <Contacto nombre={ "Jose"} apellido={"Cuellar"} telefono={3814521452} id="2" />
      <Contacto nombre={ "Martina"} apellido={"Castillo"} telefono={381452152} id="3" />
      <Contacto nombre={ "Guillermo"} apellido={"Ghiggia"} telefono={3814403698} id="4" />
      <Contacto nombre={ "Lucas"} apellido={"Coronel"} telefono={38145658963} id="5" />

</div>

)

ReactDOM.render (<Lista/>, document.getElementById('root'))