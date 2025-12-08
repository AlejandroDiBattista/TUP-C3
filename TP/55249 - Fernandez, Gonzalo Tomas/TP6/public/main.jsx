// main.jsx

function App() {
  // Estados
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');
  
  // Arreglo con 30 frases de saludo
  const greetingMessages = [
    `Hola ${loggedIn ? userInfo.username : 'Invitado/a'}`,
    `Bienvenido a la página ${loggedIn ? userInfo.username : 'Invitado/a'}`,
    `Qué hay de nuevo ${loggedIn ? userInfo.username : 'Invitado/a'}`,
    `Buenas ${loggedIn ? userInfo.username : 'Invitado/a'}`,
    `Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Cómo estás hoy?`,
    `¡Qué gusto verte, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `Bienvenido de nuevo, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `¡Saludos, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! Espero que tengas un gran día.`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Listo para explorar?`,
    `Bienvenido/a, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Qué tal tu día?`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Bienvenido/a!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Qué novedades?`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `¡Qué bueno verte, ${loggedIn ? userInfo.username : 'Invitado/a'}!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Feliz día!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Cómo te va?`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¿Qué tal?`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Espero que disfrutes tu visita!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Espero que tengas un buen día!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Espero que todo vaya bien!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Es bueno verte!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Qué bueno verte!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Espero que te diviertas!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Disfruta tu visita!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Es genial verte aquí!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Qué alegría verte!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Que tengas un excelente día!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Espero que te vaya bien!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Qué tal!`,
    `¡Hola, ${loggedIn ? userInfo.username : 'Invitado/a'}! ¡Disfruta tu día!`
  ];      

  // Función para mostrar contraseña
  function showPassword() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  // Función para reproducir sonido
  const playSound = (type) => {
    const audioElement = document.getElementById(type === 'success' ? 'successSound' : 'errorSound');
    if (audioElement) {
      audioElement.play();
    }
  };

  // Funciones de validación y manejo de mensajes
  function validateInputs(username, password) {
    if (!username || !password) {
      showMessage('Por favor, complete todos los campos.', 'error');
      playSound('error');
      return false;
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,15}$/.test(password)) {
      showMessage(
        'La contraseña debe tener entre 8 y 15 caracteres, al menos una letra y un número.',
        'error'
      );
      playSound('error');
      return false;
    }
    return true;
  }

  function showMessage(message, type) {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  }

  
  function getRandomGreeting() {
  const randomIndex = Math.floor(Math.random() * greetingMessages.length);
  return greetingMessages[randomIndex];
  }
  
  // Funciones de la API
  async function fetchRegister(username, password) {
    if (!validateInputs(username, password)) return;
    
    let user = { username, password };
    let res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    let data = await res.json();
    showMessage(data.message, data.ok ? 'success' : 'error');
    if (data.ok) {
      setCurrentPage('main');
      playSound('success');
    } else {
      playSound('error');
    }
  }
  
  async function fetchLogin(username, password) {
    if (!validateInputs(username, password)) return;

    let user = { username, password };
    let res = await fetch('/login', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include'
    });
    let data = await res.json();
    showMessage(data.message, data.ok ? 'success' : 'error');
    if (data.ok) {
      setLoggedIn(true);
      setToken(data.token);
      setUserInfo(user);
      setCurrentPage('main');
      playSound('success');
    } else {
      playSound('error');
    }
  }
  
  async function fetchLogout() {
    let res = await fetch('/logout', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    let data = await res.json();
    showMessage(data.message, data.ok ? 'success' : 'error');
    if (data.ok) {
      setLoggedIn(false);
      setToken('');
      setUserInfo(null); 
      setCurrentPage('main');
      playSound('success');
    }
  }

  async function fetchInfo() {
    let res = await fetch('/info', {
      credentials: 'include',
      headers: { 'Authorization': `Bearer ${token}` } 
    });
    let data = await res.json();
    if (data.ok) {
      setUserInfo(data.user);
      setCurrentPage('info');
    } else {
      showMessage(data.message, 'error');
      playSound('error');
    }
  }

  // Componentes
  function Main() {
    return (
      <div className="container">
        <header className="header">
          <nav>
            <div className="nav-left">
              {!loggedIn && <a href="#" onClick={() => setCurrentPage('main')}>Inicio</a>}
              {loggedIn && <a href="#" onClick={fetchInfo}>Información de la Cuenta</a>}
            </div>
            <div className="nav-right">
              {!loggedIn && <a href="#" onClick={() => setCurrentPage('register')} className="register-link">Registrarse</a>}
              {!loggedIn && <a href="#" onClick={() => setCurrentPage('login')} className="login-link">Iniciar Sesión</a>}
              {loggedIn && <a href="#" onClick={fetchLogout} className="logout-link">Cerrar Sesión</a>}
            </div>
          </nav>
        </header>
        <main>
          <h1>{getRandomGreeting()}</h1>
          {message && <p className={messageType === 'success' ? 'message-success' : 'message-error'}>{message}</p>}
        </main>
        <footer>@Gonzalo Tomas Fernandez 2024</footer>
      </div>
    );
  }

  function Register() {
    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
  
    async function handleRegister(e) {
      e.preventDefault();
      if (validateInputs(regUsername, regPassword)) {
        fetchRegister(regUsername, regPassword);
      }
    }
  
    return (
      <div className="container">
        <header className="header">
          <nav>
            <div className="nav-left">
              <a href="#" onClick={() => setCurrentPage('main')}>Inicio</a>
            </div>
            <div className="nav-right">
              <a href="#" onClick={() => setCurrentPage('register')} className="register-link">Registrarse</a>
              <a href="#" onClick={() => setCurrentPage('login')} className="login-link">Iniciar Sesión</a>
            </div>
          </nav>
        </header>
        <main>
          <form onSubmit={handleRegister} className="form">
            <h2>Registrarse</h2>
            <h3>Nombre de Usuario:</h3>
            <input type="text" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} minLength={7} maxLength={20} />
            <h3>Contraseña:</h3>
            <input
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              id="passwordInput"
              minLength={7}
              maxLength={20}
            />
            <h3>Mostrar contraseña <input className="checkbox" type="checkbox" onClick={showPassword} /></h3>
            <button type="submit">Aceptar</button>
            <button type="button" onClick={() => setCurrentPage('main')}>Cancelar</button>
          </form>
          {message && <p className={messageType === 'success' ? 'message-success' : 'message-error'}>{message}</p>}
        </main>
        <footer>@Gonzalo Tomas Fernandez 2024</footer>
      </div>
    );
  }  
  
  function Login() {
    const [logUsername, setLogUsername] = useState('');
    const [logPassword, setLogPassword] = useState('');
  
    async function handleLogin(e) {
      e.preventDefault();
      if (validateInputs(logUsername, logPassword)) {
        fetchLogin(logUsername, logPassword);
      }
    }
  
    return (
      <div className="container">
        <header className="header">
          <nav>
            <div className="nav-left">
              <a href="#" onClick={() => setCurrentPage('main')}>Inicio</a>
            </div>
            <div className="nav-right">
              <a href="#" onClick={() => setCurrentPage('register')} className="register-link">Registrarse</a>
              <a href="#" onClick={() => setCurrentPage('login')} className="login-link">Iniciar Sesión</a>
            </div>
          </nav>
        </header>
        <main>
          <form onSubmit={handleLogin} className="form">
            <h2>Iniciar Sesión</h2>
            <h3>Nombre de Usuario:</h3>
            <input type="text" value={logUsername} onChange={(e) => setLogUsername(e.target.value)} minLength={7} maxLength={20} required />
            <h3>Contraseña:</h3>
            <input
              type="password"
              value={logPassword}
              onChange={(e) => setLogPassword(e.target.value)}
              id="passwordInput"
              minLength={7}
              maxLength={20}
              required
            />
            <h3>Mostrar contraseña <input className="checkbox" type="checkbox" onClick={showPassword} /></h3>
            <button type="submit">Aceptar</button>
            <button type="button" onClick={() => setCurrentPage('main')}>Cancelar</button>
          </form>
          {message && <p className={messageType === 'success' ? 'message-success' : 'message-error'}>{message}</p>}
        </main>
        <footer>@Gonzalo Tomas Fernandez 2024</footer>
      </div>
    );
  }
  
  function Info() {
    return (
      <div className="container">
        <header className="header">
          <nav>
            <div className="nav-left">
              {loggedIn && <a href="#" onClick={() => setCurrentPage('main')}>Inicio</a>}
            </div>
            <div className="nav-right">
              {loggedIn && <a href="#" onClick={fetchLogout} className="logout-link">Cerrar Sesión</a>}
            </div>
          </nav>
        </header>
        <main>
          <div className="info">
            <h2>Información de la Cuenta</h2>
            <p><b>Nombre de Usuario:</b> {userInfo?.username}</p>
            <p><b>Contraseña:</b> {userInfo?.password}</p>
            <button onClick={() => setCurrentPage('main')}>Salir</button>
          </div>
        </main>
        {message && <p className={messageType === 'success' ? 'message-success' : 'message-error'}>{message}</p>}
        <footer>@Gonzalo Tomas Fernandez 2024</footer>
      </div>
    );
  }
  

  return (
    <div>
      {currentPage === 'main' && <Main />}
      {currentPage === 'register' && <Register />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'info' && <Info />}
    </div>
  );
}
