function App() {
  let [mensaje, setMensaje] = React.useState('');
  
  // function usuarios() {
  //   console.log('Ver usuarios');
  //   fetch('/usuarios')
  //     .then(res => res.json())
  //     .then(data => setMensaje(JSON.stringify(data)) )
  // }

  async function usuarios() {
    let res = await fetch('/usuarios');
    let data = await res.json();
    setMensaje(JSON.stringify(data,null,2));
  }

  async function registrar() {
    let usuario = { user: 'adibattista', password: '1234' }
    let res = await fetch('/registrar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(usuario)
    });
    let data = await res.json();
    setMensaje(JSON.stringify(data,null,2));
  }

  async function login() {
    let usuario = { user: 'adibattista', password: '1234' }
    let res = await fetch('/login', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(usuario),
      credentials: 'include'
    });
    let data = await res.json();
    setMensaje(JSON.stringify(data,null,2));
  }

  async function logout() {
    let res = await fetch('/logout', {
      method: 'PUT',
      credentials: 'include'
    });
    let data = await res.json();
    setMensaje(JSON.stringify(data,null,2));
  }

  async function info() {
    let res = await fetch('/info', {
      method: 'GET',
      credentials: 'include'
    });
    let data = await res.json();
    setMensaje(JSON.stringify(data,null,2));
  }

  return (
    <div>
      <h1>Demo Login</h1>
      <button onClick={usuarios}>Ver Usuarios</button>
      <button onClick={registrar}>Registrar</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={info}>Info</button>
      
      <pre>
        {mensaje}
      </pre>
    </div>
  );;
}