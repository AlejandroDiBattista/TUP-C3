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
        } else {
            setMensaje(data.error || 'Usuario o contraseña incorrectos');
        }
    };


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
            <div className="container">
                <h2 className="H2_TITULO">{modo === 'registrar' ? 'REGISTRAR USUARIO' : 'CARGA DE USUARIO' }</h2>
                {!estaLogueado ? (
                    <form onSubmit={modo === 'registrar' ? manejarRegistro : manejarInicioSesion}>
                        <div>
                            <label>Usuario:</label>
                            <input className="input_1"
                                type="text"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Contraseña:</label>
                            <input className="input_1"
                                type="password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                        {modo === 'registrar' ? (
                            <button className="boton_regis" type="submit">REGISTRAR CUENTA</button>
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
                    <button className="buton_largo" onClick={() => cambiarModo('login')}>Iniciar Sesión</button>
                )}
                {modo === 'login' && !estaLogueado && (
                    <button onClick={() => cambiarModo('registrar')}>Modo Registrar</button>
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