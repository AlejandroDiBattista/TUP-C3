function App() {
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [deleteUsername, setDeleteUsername] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteResult, setDeleteResult] = useState('');

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
            alert('Datos incorrectos');
        }
    };

    const logoutUser = () => {
        setLoggedInUser(null);
    };

    const handleViewUsers = () => {
        alert(`Usuarios registrados: ${users.map(user => user.username).join(', ')}`);
    };

    const handleDeleteUser = () => {
        const userIndex = users.findIndex(
            (user) => user.username === deleteUsername && user.password === deletePassword
        );
        if (userIndex !== -1) {
            const updatedUsers = [...users];
            updatedUsers.splice(userIndex, 1);
            setUsers(updatedUsers);
            setDeleteUsername('');
            setDeletePassword('');
            setDeleteResult(`Usuario ${deleteUsername} eliminado correctamente.`);
            // Cerrar sesión automáticamente después de eliminar el usuario
            logoutUser();
        } else {
            setDeleteResult('No se encontró el usuario con los datos proporcionados.');
        }
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <div>
                <button onClick={handleViewUsers}>Ver Usuarios</button>
            </div>
            <div>
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
            <div>
                {loggedInUser && (
                    <div>
                        <h3>Eliminar Usuario</h3>
                        <DeleteUserForm
                            onDelete={handleDeleteUser}
                            deleteUsername={deleteUsername}
                            deletePassword={deletePassword}
                            onDeleteUsernameChange={setDeleteUsername}
                            onDeletePasswordChange={setDeletePassword}
                            deleteResult={deleteResult}
                        />
                    </div>
                )}
            </div>
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
                Usuario:
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
                Usuario:
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
            <p>Usuario: {user.username}</p>
        </div>
    );
}

function DeleteUserForm({
    onDelete,
    deleteUsername,
    deletePassword,
    onDeleteUsernameChange,
    onDeletePasswordChange,
    deleteResult
}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onDelete();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Usuario:
                <input
                    type="text"
                    value={deleteUsername}
                    onChange={(e) => onDeleteUsernameChange(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => onDeletePasswordChange(e.target.value)}
                />
            </label>
            <button type="submit">Eliminar Usuario</button>
            <p>{deleteResult}</p>
        </form>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
