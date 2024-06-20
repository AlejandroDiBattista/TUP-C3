function App() {
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    const registerUser = (username, password) => {
        setUsers([...users, { username, password }]);
    };

    const loginUser = (username, password) => {
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
        if (user) {
            setLoggedInUser(user);
        } else {
            alert('Invalid credentials');
        }
    };

    const logoutUser = () => {
        setLoggedInUser(null);
    };

    return (
        <div>
            <h1>Sesiones</h1>
            {loggedInUser ? (
                <div>
                    <button onClick={logoutUser}>Cerrar Sesión</button>
                    <ProtectedInfo user={loggedInUser} />
                </div>
            ) : (
                <div className="form-container">
                    {showLogin ? (
                        <LoginForm onLogin={loginUser} onBack={() => setShowLogin(false)} />
                    ) : (
                        <div>
                            <RegisterForm onRegister={registerUser} />
                            <button onClick={() => setShowLogin(true)}>Login</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>REGISTRAR</h3>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Registrar</button>
        </form>
    );
}

function LoginForm({ onLogin, onBack }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>LOGIN</h3>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Login</button>
            <button type="button" onClick={onBack}>Volver</button>
        </form>
    );
}

function ProtectedInfo({ user }) {
    return (
        <div>
            <h3>INFORMACIÓN DEL USUARIO</h3>
            <p>Username: {user.username}</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
