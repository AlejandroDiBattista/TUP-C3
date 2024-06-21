function App() {
    const [registroData, setRegistroData] = useState({ usuario: '', contrasena: '' });
    const [loginData, setLoginData] = useState({ usuario: '', contrasena: '' });
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState({ mensaje: '', usuario: '' });

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
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registroData)
            });

            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSuccessMessage(data.mensaje);
                setErrorMessage('');
            } else {
                setErrorMessage(data.mensaje);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/iniciarSesion', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setIsSessionActive(true);
                setSuccessMessage(data.mensaje);
                setErrorMessage('');
            } else {
                setErrorMessage(data.mensaje);
                setSuccessMessage('');
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
                setInfoMessage(newInfo);
            } else {
                setErrorMessage(data.mensaje);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const logoutUser = async () => {
        try {
            const response = await fetch('/cerrarSesion', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setIsSessionActive(false);
                setSuccessMessage(data.mensaje);
                setErrorMessage('');
            } else {
                setErrorMessage(data.mensaje);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="header">Trabajo N°6</h1>
            <div className="form-section-one">
                <div className="registration-form">
                    <h3 className="form-header">Registro</h3>
                    <form onSubmit={registerUser}>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Crear usuario"
                            value={registroData.usuario}
                            onChange={handleRegistroChange}
                        />
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Crear contraseña"
                            value={registroData.contrasena}
                            onChange={handleRegistroChange}
                        />
                        <button type="submit">Registrar</button>
                    </form>
                </div>
                <div className="login-form">
                    <h3 className="form-header">Iniciar Sesión</h3>
                    <form onSubmit={loginUser}>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Ingresar usuario"
                            value={loginData.usuario}
                            onChange={handleLoginChange}
                        />
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Ingresar contraseña"
                            value={loginData.contrasena}
                            onChange={handleLoginChange}
                        />
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
            {!isSessionActive ? (
                <div className="form-section-two">
                    <div className="messages">
                        <p className="error-message">{errorMessage}</p>
                        <p className="success-message">{successMessage}</p>
                    </div>
                    <div className="user-info">
                        <p className="warning">Inicia sesión para ver esta información</p>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="messages">
                        <p className="error-message">{errorMessage}</p>
                        <p className="success-message">{successMessage}</p>
                    </div>
                    <div className="user-info">
                        <p>{infoMessage.mensaje + " " + infoMessage.usuario}</p>
                    </div>
                    <div className="action-buttons">
                        <button onClick={fetchInfo}>Ver info</button>
                        <button onClick={logoutUser}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    );
}