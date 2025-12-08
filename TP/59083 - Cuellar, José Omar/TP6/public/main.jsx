function App() {
  // Estados para manejar la información del formulario y las respuestas del servidor
  let [mensaje, setMensaje] = React.useState('');
  let [user, setUser] = React.useState('');
  let [password, setPassword] = React.useState('');
  
  // Función asincrónica para obtener la lista de usuarios desde el servidor
  async function usuarios() {
    let res = await fetch('/usuarios'); // Realiza una solicitud GET a la ruta '/usuarios'
    let data = await res.json(); // Convierte la respuesta a JSON
    setMensaje(JSON.stringify(data,null,2)); // Actualiza el estado 'mensaje' con la lista de usuarios formateada
  }

  // Función asincrónica para registrar un nuevo usuario
  async function registrar() {
    let usuario = { user: user, password: password }; // Crea un objeto 'usuario' con los datos del formulario
    let res = await fetch('/registrar', { // Realiza una solicitud POST a la ruta '/registrar'
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, // Especifica el tipo de contenido JSON
      body: JSON.stringify(usuario) // Envía el objeto 'usuario' como JSON en el cuerpo de la solicitud
    });
    let data = await res.json(); // Convierte la respuesta a JSON
    setMensaje(JSON.stringify(data,null,2)); // Actualiza el estado 'mensaje' con la respuesta del servidor formateada
  }

  // Función asincrónica para iniciar sesión de usuario
  async function login() {
    let usuario = { user: user, password: password }; // Crea un objeto 'usuario' con los datos del formulario
    let res = await fetch('/login', { // Realiza una solicitud PUT a la ruta '/login'
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}, // Especifica el tipo de contenido JSON
      body: JSON.stringify(usuario), // Envía el objeto 'usuario' como JSON en el cuerpo de la solicitud
      credentials: 'include' // Incluye las credenciales (cookies) en la solicitud
    });
    let data = await res.json(); // Convierte la respuesta a JSON
    setMensaje(JSON.stringify(data,null,2)); // Actualiza el estado 'mensaje' con la respuesta del servidor formateada
  }

  // Función asincrónica para cerrar sesión de usuario
  async function logout() {
    let res = await fetch('/logout', { // Realiza una solicitud PUT a la ruta '/logout'
      method: 'PUT',
      credentials: 'include' // Incluye las credenciales (cookies) en la solicitud
    });
    let data = await res.json(); // Convierte la respuesta a JSON
    setMensaje(JSON.stringify(data,null,2)); // Actualiza el estado 'mensaje' con la respuesta del servidor formateada
  }

  // Función asincrónica para obtener información del usuario autenticado
  async function info() {
    let res = await fetch('/info', { // Realiza una solicitud GET a la ruta '/info'
      method: 'GET',
      credentials: 'include' // Incluye las credenciales (cookies) en la solicitud
    });
    let data = await res.json(); // Convierte la respuesta a JSON
    setMensaje(JSON.stringify(data,null,2)); // Actualiza el estado 'mensaje' con la respuesta del servidor formateada
  }

  // Componente principal que renderiza el formulario y las respuestas del servidor
  return (
    <div>
      <h1>Demo Login</h1>
      <button onClick={usuarios}>Ver Usuarios</button>
      <input className="form-input"
        type="text" 
        placeholder="Usuario" 
        value={user} 
        onChange={(e) => setUser(e.target.value)} 
      />
      <input className="form-input"
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={registrar}>Registrar</button>
      <button onClick={login}>Loguear Usuario</button>
      <button onClick={logout}>Desloguear Usuario</button>
      <button onClick={info}>Información</button>
      
      <pre>
        {mensaje}
      </pre>
    </div>
  );
}
