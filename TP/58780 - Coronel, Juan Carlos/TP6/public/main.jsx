const { useState } = React;

function App() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        const res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        });
        const data = await res.json();
        setMessage(data.mensaje);
    };

    const handleLogin = async () => {
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        });
        const data = await res.json();
        setMessage(data.mensaje);
    };

    const handleLogout = async () => {
        const res = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setMessage(data.mensaje);
    };

    const fetchInfo = async () => {
        const res = await fetch('/info');
        const data = await res.json();
        setMessage(data.mensaje);
    };

    return (
        <div>
            <h1>Gestión de Sesiones</h1>
            <div>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleRegister}>Registrar</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={fetchInfo}>Info</button>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
