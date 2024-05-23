const App = () => (
  <div>

  </div>
)
// Definir una clase para los contactos
class Contacto {
  constructor(id, nombre, telefono, email) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
    this.email = email;
  }
}

// Crear un array para almacenar los contactos
let agenda = [
  new Contacto(1, "Juan", "3813258496", "juanlopez@gmail.com"),
  new Contacto(2, "María", "3814795326", "mariagalvez@gmail.com"),
  new Contacto(3, "Pedro", "3815697946", "pedrorodriguez@gmail.com")
];

ReactDOM.render(<App />, document.getElementById('root'))