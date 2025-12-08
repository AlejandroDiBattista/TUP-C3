const { useState, useEffect } = React;

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        const data = await response.json();
        setMessage(data.message);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });
        const data = await response.json();
        if (response.ok) {
            setLoggedIn(true);
        }
        setMessage(data.message);
    };

    const handleLogout = async () => {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await response.json();
        setLoggedIn(false);
        setMessage(data.message);
    };

    const fetchInfo = async () => {
        const response = await fetch('http://localhost:3000/info', {
            credentials: 'include'
        });
        const data = await response.json();
        setMessage(data.message);
    };

    useEffect(() => {
        if (loggedIn) {
            fetchInfo();
        }
    }, [loggedIn]);

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <h2>{loggedIn ? 'Información Confidencial' : 'Autenticación'}</h2>
            {!loggedIn ? (
                <>
                    <form onSubmit={handleRegister}>
                        <h3>Registrar</h3>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Registrar</button>
                    </form>
                    <form onSubmit={handleLogin}>
                        <h3>Iniciar Sesión</h3>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </>
            ) : (
                <>
                    <p>{message}</p>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            )}
            <p>{message}</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);