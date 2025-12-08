function App() {
    const [action, setAction] = useState("Registrarse");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setError(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/info', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRegister = async () => {
        if (!username || !email || !password) {
            setMessage("Todos los campos son obligatorios.");
            setError(true);
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            setMessage(data.message);
            setError(!response.ok);
            if (response.ok) {
                document.cookie = `token=${data.token}`;
                setUser({ email, username: data.username });
                
                setEmail("");
                setPassword("");
                setUsername("");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Error en el servidor.");
            setError(true);
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage("Todos los campos son obligatorios.");
            setError(true);
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            setMessage(data.message);
            setError(!response.ok);
            if (response.ok) {
                document.cookie = `token=${data.token}`;
                setUser({ email, username: data.username });
                setIsLoggedIn(true);
                setEmail("");
                setPassword("");
                setUsername("");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Error en el servidor.");
            setError(true);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setMessage(data.message);
            setError(!response.ok);
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setIsLoggedIn(false);
            setUser(null);
            setEmail("");
            setPassword("");
            setUsername("");
        } catch (error) {
            console.error('Error:', error);
            setMessage("Error en el servidor.");
            setError(true);
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const switchAction = (newAction) => {
        setAction(newAction);
        setMessage("");
        setError(false);
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{isLoggedIn ? "Más información" : action}</div>
                <div className="underline"></div>
            </div>
            {isLoggedIn ? (
                <div className="logged-in-info">
                    <h2>Bienvenido, {user.username}!</h2>
                    <p>Correo electrónico: {user.email}</p>
                    <div className="submit" onClick={handleLogout}>Cerrar Sesión</div>
                </div>
            ) : (
                <div className="inputs">
                    {action === "Registrarse" ? (
                        <div>
                            <div className="input">
                                <img src="/Assets/person.png" alt="User Icon" />
                                <input type="text" placeholder="Nombre de usuario" aria-label="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="input">
                                <img src="/Assets/email.png" alt="Email Icon" />
                                <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input">
                                <img src="/Assets/password.png" alt="Password Icon" />
                                <input type="password" placeholder="Contraseña" aria-label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="input">
                                <img src="/Assets/email.png" alt="Email Icon" />
                                <input type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input">
                                <img src="/Assets/password.png" alt="Password Icon" />
                                <input type="password" placeholder="Contraseña" aria-label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    )}
                    <div className="submit-container">
                        {action === "Registrarse" ? (
                            <div>
                                <div className="submit" onClick={handleRegister}>Registrarse</div>
                                <div className="switch-action" onClick={() => switchAction("Iniciar Sesión")}>¿Ya tienes una cuenta? <div className="submit" >Iniciar Sesión</div></div>
                            </div>
                        ) : (
                            <div>
                                <div className="submit" onClick={handleLogin}>Acceder</div>
                                <div className="switch-action" onClick={() => switchAction("Registrarse")}>¿No tienes una cuenta? <div className="submit" >Registrarse</div></div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {message && <div className={`message ${error ? 'error' : 'success'}`}>{message}</div>}
        </div>
    );
}