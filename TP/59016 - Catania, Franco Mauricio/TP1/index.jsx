// Origen de datos
const contactos = [
  { id: 45110946, nombre: "Franco", apellido: "Catania",telefono: 125634 },
  { id: 124652, nombre: "Mati", apellido: "Cuevas", telefono: 14562 },
  { id: 8564, nombre: "Seba",apellido:"Cruz", telefono: 96423 },
  { id: 5423, nombre: "Mario",apellido:"Corral", telefono: 12345 },
  { id: 96543, nombre: "Fabri",apellido:"Delgado", telefono: 964235 }
];

///Funcion para mostrar con codigo html y parametros en Js
const Contacto = ({ nombre, apellido, telefono }) => (
  <div className="contacto">
    <h2> 
      {nombre.toUpperCase()} <b>{apellido.toUpperCase()}</b>
    </h2>
    <h3>Telefono: {telefono}</h3> 
  </div>
);
//Funcion Orden Superior, 
const App = () => (
  <div id="main">
    <h1 >CONTACTOS</h1> 
     {contactos.map(contacto => ( ///Recorremos el array de objetos(Origen de datos)
      <Contacto //Funcion Mostrar
         key={contacto.id} 
         nombre={contacto.nombre} // Igualamos a los parametros pasados en Contacto()
         apellido={contacto.apellido}
         telefono={contacto.telefono}/>  
  ))}
  </div>
);
///Renderizamos la funcion App y la mostramos en el elemento Root
ReactDOM.render(<App />, document.getElementById("root"));
//