function Registrarse() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setMessage('Por favor, complete todos los campos.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, password }),
            });
            const data = await response.json();
            setMessage(data.mensaje);
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            setMessage('Error al registrar usuario');
        }
    };

    return (
        <section>
            <form onSubmit={handleRegister}>
                <div className="panel">
                    <h1>Registrarse</h1>
                    <div className="Datos">
                        <label>Usuario</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Registrarse</button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </form>
        </section>
    );
}

function IniciarSesion({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            setMessage('Por favor, complete todos los campos.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: username, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
            setMessage(data.mensaje);
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            setMessage('Datos inválidos, verifique si están bien');
        }
    };

    return (
        <section>
            <form onSubmit={handleLogin}>
                <div className="panel">
                    <h1>Iniciar Sesión</h1>
                    <div className="Datos">
                        <label>Usuario</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Iniciar Sesión</button>
                        {message && <p>{message}</p>}
                    </div>
                </div>
            </form>
        </section>
    );
}

function Inicio() {
    return (
        <>
            <h3>Iniciar Sesión o Registrarse</h3>
        </>
    );
}

function Informacion({ token }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtectedInfo = async () => {
            try {
                const response = await fetch('http://localhost:3000/info', {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                    },
                });
                const data = await response.json();
                if (response.status === 200) {
                    setMessage(data.mensaje);
                }
            } catch (error) {
                console.error('Error al realizar la petición:', error);
                setMessage('Error al obtener información protegida');
            }
        };

        fetchProtectedInfo();
    }, [token]);

    return (
        <section>
            <h1><center>Información Protegida</center></h1>
            <p>{message}</p>
        </section>
    );
}

function App() {
    const [activeComponent, setActiveComponent] = useState('inicio');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setIsLoggedIn(false);
                setActiveComponent('inicio');
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            setActiveComponent('informacion');
        }
    }, [isLoggedIn]);

    return (
        <>
            <header className='header'>
                <nav className='links'>
                    <ul>
                        <li><a href="#" onClick={() => setActiveComponent('inicio')}>Inicio</a></li>
                        {!isLoggedIn && <li><a href="#" onClick={() => setActiveComponent('registrarse')}>Registrarse</a></li>}
                        {!isLoggedIn && <li><a href="#" onClick={() => setActiveComponent('iniciarSesion')}>Iniciar Sesión</a></li>}
                        {isLoggedIn && <li><a href="#" onClick={handleLogout}>Cerrar Sesión</a></li>}
                    </ul>
                </nav>
            </header>
            <body>
                {activeComponent === 'inicio' && <Inicio />}
                {activeComponent === 'registrarse' && <Registrarse />}
                {activeComponent === 'iniciarSesion' && <IniciarSesion setIsLoggedIn={setIsLoggedIn} />}
                {activeComponent === 'informacion' && <Informacion />}
            </body>
        </>
    );
};