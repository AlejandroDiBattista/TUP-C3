function App() {
    const [registro, setRegistro] = useState({ user: '', password: '' });
    const [login, setLogin] = useState({ user: '', password: '' });
    const [sesion, setSesion] = useState(false);
    const [msjError, setMsjError] = useState('');
    const [msjExito, setMsjExito] = useState('');
    const [msjInfo, setMsjInfo] = useState({ mensaje: '', usuario: '' });

    const handleChangeRegistro = (e) => {
        const { name, value } = e.target;
        setRegistro({ ...registro, [name]: value });
        console.log(name, value);
    };

    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
        console.log(name, value);
    };

    const registrar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registro)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setMsjExito(data.mensaje);
                setMsjError('');
                setRegistro({ ...registro, user: '', password: '' });
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
                setRegistro({ ...registro, user: '', password: '' });
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesion(true);
                setMsjExito(data.mensaje);
                setMsjError('');
                setLogin({ ...login, user: '', password: '' });
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
                setLogin({ ...login, user: '', password: '' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const verInfo = async () => {
        try {
            const response = await fetch('/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                const newInfo = { mensaje: data.mensaje, usuario: data.usuario };
                setMsjInfo(newInfo);
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesion(false);
                setMsjExito(data.mensaje);
                setMsjError('');
            } else {
                setMsjError(data.mensaje);
                setMsjExito('');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }

    };

    return (
        <div className="contenedor">
            <h1 className="h1-tp6">TP6 - Sesiones</h1>
            <div className="contenedor-formularios">
                <div className="contenedor-formularios-seccion-uno">
                    <div className="form-registro">
                        <h2 className="h2-form">Registro</h2>
                        <form className="form" onSubmit={registrar}>
                            <input
                                type="text"
                                name="user"
                                placeholder="USUARIO"
                                className="input"
                                value={registro.user}
                                onChange={handleChangeRegistro}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="CONTRASEÑA"
                                className="input"
                                value={registro.password}
                                onChange={handleChangeRegistro}
                            />
                            <button type="submit" className="button-registro">Registrar</button>
                        </form>
                    </div>
                    <div className="form-login">
                        <h2 className="h2-form">Iniciar Sesión</h2>
                        <form className="form" onSubmit={iniciarSesion}>
                            <input
                                type="text"
                                name="user"
                                placeholder="USUARIO"
                                className="input"
                                value={login.user}
                                onChange={handleChangeLogin}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="CONTRASEÑA"
                                className="input"
                                value={login.password}
                                onChange={handleChangeLogin}
                            />
                            <button type="submit" className="button-login">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
                {!sesion ? (<div className="contenedor-formularios-seccion-dos">
                    <div className="mensajes">
                        <p className="msj-error">{msjError}</p>
                        <p className="msj-exito">{msjExito}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="p-info-usuario-logeado">Inicia sesión para ver esta información</p>
                    </div>
                </div>)
                    :
                    (<div className="contenedor-formularios-seccion-dos">
                        <div className="mensajes">
                            <p className="msj-error">{msjError}</p>
                            <p className="msj-exito">{msjExito}</p>
                        </div>
                        <div className="info-usuario-logeado">
                            <p className="p-info-usuario-logeado">{msjInfo.mensaje + " " + msjInfo.usuario}</p>
                        </div>
                        <div className="contenedor-botones-usuario-logeado">
                            <button className="btn-ver-info" onClick={verInfo}>Ver info</button>
                            <button className="btn-cerrar-sesion" onClick={logout}>Cerrar Sesión</button>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}