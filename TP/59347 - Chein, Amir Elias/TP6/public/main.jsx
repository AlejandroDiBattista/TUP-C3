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
            alert('Credenciales inválidas');
        }
    };

    const logoutUser = () => {
        setLoggedInUser(null);
    };

    const toggleLoginForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            <h1>usuario</h1>
            {loggedInUser ? (
                <LoggedInSection user={loggedInUser} onLogout={logoutUser} />
            ) : (
                <LoginFormContainer
                    showLogin={showLogin}
                    onToggleLogin={toggleLoginForm}
                    onRegister={registerUser}
                    onLogin={loginUser}
                />
            )}
        </div>
    );
}

function LoggedInSection({ user, onLogout }) {
    return (
        <div>
            <button onClick={onLogout}>Logout</button>
            <ProtectedInfo user={user} />
        </div>
    );
}

function LoginFormContainer({ showLogin, onToggleLogin, onRegister, onLogin }) {
    return (
        <div className="form-container">
            {showLogin ? (
                <LoginForm onLogin={onLogin} onBack={onToggleLogin} />
            ) : (
                <div>
                    <RegisterForm onRegister={onRegister} />
                    <button onClick={onToggleLogin}>Login</button>
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
                Nombre de usuario:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Contraseña:
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
                Nombre de usuario:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                Contraseña:
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
            <p>Nombre de usuario: {user.username}</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
