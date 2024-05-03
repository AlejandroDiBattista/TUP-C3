const Contacto = ({id, nombre, apellido, telefono, email}) => (
    <div className="caja__contenedor">
        <div className="tarjeta__contacto">
            <h3 className="tarjeta__nombre">{nombre} {apellido}</h3>
            <p className="tarjeta__parrafo">Informacion</p>
            <h3 className="tarjeta__numero">{telefono}</h3>
            <h3 className="tarjeta__email"><a href="#">{email}</a></h3>
            <h3><button className="tarjeta__button"></button></h3>
        </div>
    </div>
)
const Agenda = () => (
    <div className="agenda">
      <h1 className="agenda__titulo">Lista de contactos</h1>
      <div id="fabricio">
         <Contacto id={"1"} nombre={"Fabricio"} apellido={"Delgado"} telefono={"3816719742"} email={"fabridkdkno4@gmail.com"}/>
      </div>
      <div id="franco">
         <Contacto id={"2"} nombre={"Franco"} apellido={"Catania"} telefono={"381456784"} email={"Fracatania@gmail.com"}/>
      </div>
      <div id="mario">
         <Contacto id={"2"} nombre={"Mario"} apellido={" Corral"} telefono={"381344566"} email={"MarioCorral@gmail.com"}/>
      </div>
      <div id="seba">
         <Contacto id={"2"} nombre={"Sebastian"} apellido={"Cruz"} telefono={"3816567854"} email={"Sebados@gmail.com"}/>
      </div>
      <div id="matias">
         <Contacto id={"2"} nombre={"Matias"} apellido={"Cueva"} telefono={"381645642"} email={"MatiasCue@gmail.com"}/>
      </div>
      <div id="gonzalo">
         <Contacto id={"2"} nombre={"Gonzalo"} apellido={"Chavez"} telefono={"3816734242"} email={"GonzaCh@gmail.com"}/>
      </div>
      <div id="lucas">
         <Contacto id={"2"} nombre={"Lucas"} apellido={"Coronel"} telefono={"381645683"} email={"LucasCoronel@gmail.com"}/>
      </div>
      <h2 className="agenda__titulo">MI PRIMER TRABAJO EN REACT - PROGRAMACION III - 2024</h2>
      <p className="agenda__titulo">DELGADO FABRICIO TOBIAS - 59075 - COMISION 3</p>
    </div>
)
ReactDOM.render(<Agenda />, document.getElementById('root'))