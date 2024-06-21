function App() {
    const [registroData, setRegistroData] = useState({ usuario: '', password: '' });
    const [loginData, setLoginData] = useState({ usuario: '', password: '', token: '' });
    const [mensajeError, setMensajeError] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [mensajeInformacion, setMensajeInformacion] = useState({ mensaje: '', usuario: '' });

    const generateToken = () => {
        const token = Math.random().toString(36).substring(2);
        return token;
    };

    const handleRegistroChange = (e) => {
        const { name, value } = e.target;
        setRegistroData({ ...registroData, [name]: value });
        console.log(name, value);
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        console.log(name, value);
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registroData)
            });
            const data = await response.json();
            console.log(data);

            if (data.ok) {
                setMensajeExito(data.mensaje);
                setMensajeError('');
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            console.log(data);

            if (data.usuario !== undefined && data.password !== undefined) {
                // Generar el token solo si usuario y password no son indefinidos
                const token = generateToken();
                setLoginData({ ...loginData, token });
                setMensajeExito(data.mensaje);
                setMensajeError('');
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const fetchInfo = async () => {
        try {
            const response = await fetch('/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log(data);

            if (data.ok) {
                const newInfo = { mensaje: data.mensaje, usuario: data.usuario };
                setMensajeInformacion(newInfo);
            } else {
                setMensajeError(data.mensaje);
                setMensajeExito('');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const logoutUser = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            console.log(data);
            setLoginData({ ...loginData, token: '' });
            setMensajeExito(data.mensaje);
            setMensajeError('');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="header">Gestion de sesiones</h1>
            <div className="form-section-one">
                <div className="registration-form">
                    <h3 className="form-header">Registro</h3>
                    <form onSubmit={registerUser}>
                        <div className="form-inputs">
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Crear usuario"
                                value={registroData.usuario}
                                onChange={handleRegistroChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Crear contraseña"
                                value={registroData.password}
                                onChange={handleRegistroChange}
                            />
                        </div>
                        <button type="submit">Registrar</button>
                    </form>
                </div>
                <div className="login-form">
                    <h3 className="form-header">Iniciar Sesión</h3>
                    <form onSubmit={loginUser}>
                        <div className="form-inputs">
                            <input
                                type="text"
                                name="usuario"
                                placeholder="Ingresar usuario"
                                value={loginData.usuario}
                                onChange={handleLoginChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Ingresar contraseña"
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
            {loginData.token === '' ? (
                <div className="form-section-two">
                        <p>Inicia sesión para ver esta información</p>
                </div>
            ) : (
                <div className="form-section-two">
                    <div className="user-info">
                        <p>{mensajeInformacion.mensaje + " " + mensajeInformacion.usuario}</p>
                    </div>
                    <div className="action-buttons">
                        <button onClick={fetchInfo}>Ver info</button>
                        <button onClick={logoutUser}>Cerrar Sesión</button>
                    </div>
                    <div className="messages">
                        <p className="error-message">{mensajeError}</p>
                        <p className="success-message">{mensajeExito}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
