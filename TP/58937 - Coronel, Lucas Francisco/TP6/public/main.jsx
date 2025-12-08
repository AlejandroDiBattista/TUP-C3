function App() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [modo, setModo] = useState('registrar');
    const [estaLogueado, setEstaLogueado] = useState(false);
    const [mostrarInfo, setMostrarInfo] = useState(false);

    useEffect(() => {
        const valorCookie = getCookie('usuario');
        if (valorCookie) {
            setEstaLogueado(true);
            setNombreUsuario(valorCookie);
        }
    }, []);

    const getCookie = (nombre) => {
        const valor = `; ${document.cookie}`;
        const partes = valor.split(`; ${nombre}=`);
        if (partes.length === 2) return partes.pop().split(';').shift();
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();
        if (!nombreUsuario || !contraseña) {
            setMensaje('Por favor, complete todos los campos');
            return;
        }

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

    const manejarInicioSesion = async (e) => {
        e.preventDefault();
        if (!nombreUsuario || !contraseña) {
            setMensaje('Por favor, complete todos los campos');
            return;
        }

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreUsuario, contraseña }),
        });

        const data = await response.json();
        if (response.ok) {
            setMensaje('Usuario logueado correctamente');
            setEstaLogueado(true);
            setModo('logueado');
        } else {
            setMensaje(data.error || 'Usuario o contraseña incorrectos');
        }
    };

    const manejarCierreSesion = async () => {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setMensaje('Usuario deslogueado correctamente');
            setEstaLogueado(false);
            setModo('registrar');
            setNombreUsuario('');
            setContraseña('');
            setMostrarInfo(false);
        }
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setMensaje('');
        setNombreUsuario('');
        setContraseña('');
    };

    const manejarVerInfo = () => {
        setMostrarInfo(!mostrarInfo);
    };

    return (
        <div>
            <h1>Login</h1>
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
                        <button type="submit">
                            {modo === 'registrar' ? 'Registrar' : 'Iniciar Sesión'}
                        </button>
                    </form>
                ) : (
                    <>
                        <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
                        <button onClick={manejarVerInfo}>+info</button>
                    </>
                )}
                {modo === 'registrar' && !estaLogueado && (
                    <button onClick={() => cambiarModo('login')}>Para Iniciar Sesión</button>
                )}
                {modo === 'login' && !estaLogueado && (
                    <button onClick={() => cambiarModo('registrar')}>Para Registrarse</button>
                )}
                {mostrarInfo && estaLogueado && (
                    <div>
                        <p>Usuario: {nombreUsuario}</p>
                    </div>
                )}
                <p>{mensaje}</p>
            </div>
        </div>
    );
}
