function App() {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [mode, setMode] = useState('register');
    const [loggedIn, setLoggedIn] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const valorCookie = getCookie('user');

        if (valorCookie) {
            setLoggedIn(true);
            setName(valorCookie);
        }
    }, []);

    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();
        if (!name || !pass) {
            setMessage('Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, pass }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setName('');
                setPass('');
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            setMessage('Error en la solicitud de registro, por favor intenta nuevamente.');
        }
    };

    const manejarLoggin = async (e) => {
        e.preventDefault();
        if (!name || !pass) {
            setMessage('Por favor, complete todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, pass }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('usuario logueado correctamente');
                setLoggedIn(true);
                setMode('logueado');
            } else {
                setMessage(data.error || 'user o pass incorrectos');
            }
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error);
            setMessage('Error en la solicitud de inicio de sesión, por favor intenta nuevamente.');
        }
    };

    const manejarLogOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('user deslogueado correctamente');
                setLoggedIn(false);
                setMode('register');
                setName('');
                setPass('');
                setShowInfo(false);
            } else {
                setMessage(data.error || 'Error al intentar desloguear');
            }
        } catch (error) {
            console.error('Error en la solicitud de cierre de sesión:', error);
            setMessage('Error en la solicitud de cierre de sesión, por favor intenta nuevamente.');
        }
    };

    const changeMode = (newMode) => {
        setMode(newMode);
        setMessage('');
        setName('');
        setPass('');
    };

    const manejarMostrarInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <div className="card">
            <div className="container">
                <h2>{mode === 'register' ? 'Registro de user' : 'Login de user'}</h2>
                {!loggedIn ? (
                    <form onSubmit={mode === 'register' ? manejarRegistro : manejarLoggin}>
                        <div>
                            <label>user:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>pass:</label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                        </div>
                        <button type="submit">{mode === 'register' ? 'register' : 'Iniciar Sesión'}</button>
                    </form>
                ) : (
                    <>
                        <button onClick={manejarLogOut}>Cerrar Sesión</button>
                        <button onClick={manejarMostrarInfo}>Ver Info</button>
                    </>
                )}
                {!loggedIn && (
                    <>
                        {mode === 'register' ? (
                            <button onClick={() => changeMode('login')}>Iniciar Sesión</button>
                        ) : (
                            <button onClick={() => changeMode('register')}>register</button>
                        )}
                    </>
                )}
                {showInfo && loggedIn && (
                    <div>
                        <p>user: {name}</p>
                        <p>pass: {pass}</p>
                    </div>
                )}
                <p>{message}</p>
            </div>
        </div>
    );
}

export default App;