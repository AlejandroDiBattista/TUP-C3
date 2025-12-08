


function App() {
    const [nombreUsuario, setNombreUsuario] = useState(''); 
    const [contraseña, setContraseña] = useState(''); 
    const [mensaje, setMensaje] = useState(''); 
    const [modo, setModo] = useState('registrar'); 
    const [estaLogueado, setEstaLogueado] = useState(false); 
    const [mostrarInfo, setMostrarInfo] = useState(false); 

    useEffect(() => {
        // Verificar si hay una cookie de sesión al cargar la página
        const valorCookie = getCookie('usuario');

        // Si existe la cookie de usuario, establecer el estado de logueado a true
        if (valorCookie) {
            setEstaLogueado(true);
            setNombreUsuario(valorCookie); // Establecer el nombre de usuario desde la cookie
        }
    }, []);

    // Función para obtener el valor de una cookie
    const getCookie = (nombre) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === nombre) {
                return cookieValue;
            }
        }
        return null;
    };

    // Función para manejar el registro de usuario
    const manejarRegistro = async (e) => {
        e.preventDefault();
        if (!nombreUsuario || !contraseña) {
            setMensaje('Por favor, complete todos los campos');
            return;
        }

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreUsuario, contraseña }),
        });

        const data = await response.json();
        if (response.ok) {
            setMensaje(data.message);
            setNombreUsuario('');
            setContraseña('');
        } else {
            setMensaje(data.error);
        }
    };

    // Función para manejar el inicio de sesión
    const manejarInicioSesion = async (e) => {
        e.preventDefault();
        if (!nombreUsuario || !contraseña) {
            setMensaje('Por favor, complete todos los campos');
            return;
        }

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreUsuario, contraseña }),
        });

        const data = await response.json();
        if (response.ok) {
            setMensaje('Usuario logueado correctamente');
            setEstaLogueado(true);
            setModo('logueado');
            // No restablecer los campos de nombreUsuario y contraseña
        } else {
            setMensaje(data.error || 'Usuario o contraseña incorrectos');
        }
    };

    // Función para manejar el cierre de sesión
    const manejarCierreSesion = async () => {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            setMensaje('Usuario deslogueado correctamente');
            setEstaLogueado(false);
            setModo('registrar');
            setNombreUsuario('');
            setContraseña('');
            setMostrarInfo(false); // Ocultar información del usuario al cerrar sesión
        }
    };

    // Función para cambiar el modo (registro/inicio de sesión)
    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setMensaje('');
        setNombreUsuario('');
        setContraseña('');
    };

    // Función para manejar el botón "Ver info"
    const manejarVerInfo = () => {
        setMostrarInfo(!mostrarInfo);
    };

    return (
        <div>
            <div className="container">
                <h2>{modo === 'registrar' ? 'Registro de Usuario' : 'Login de Usuario'}</h2>
                {!estaLogueado ? (
                    <form onSubmit={modo === 'registrar' ? manejarRegistro : manejarInicioSesion}>
                        <div>
                            <label>Usuario:</label>
                            <input
                                type="text"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input
                                type="password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                        
                        {modo === 'registrar' ? (
                            <button type="submit">Registrar</button>
                        ) : modo === 'login' ? (
                            <button type="submit">Iniciar Sesión</button>
                        ) : null}
                    </form>
                ) : (
                    <>
                        <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
                        <button onClick={manejarVerInfo}>Ver info</button>
                    </>
                )}
                {modo === 'registrar' && !estaLogueado && (
                    <button onClick={() => cambiarModo('login')}> Iniciar Sesión</button>
                )}
               
                {mostrarInfo && estaLogueado && (
                    <div>
                        <p>Usuario: {nombreUsuario}</p>
                        <p>Contraseña: {contraseña}</p>
                    </div>
                )}
                <p>{mensaje}</p>
            </div>
        </div>
    );
}

export default App;
