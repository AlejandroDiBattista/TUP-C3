function App() {
    const [datosRegistro, setDatosRegistro] = useState({ usuario: '', contrasena: '' });
    const [datosLogin, setDatosLogin] = useState({ usuario: '', contrasena: '' });
    const [sesionIniciada, setSesionIniciada] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState('');
    const [exitoMensaje, setExitoMensaje] = useState('');
    const [infoMensaje, setInfoMensaje] = useState({ mensaje: '', usuario: '' });

    const manejarCambioRegistro = (e) => {
        const { name, value } = e.target;
        setDatosRegistro({ ...datosRegistro, [name]: value });
        console.log(name, value);
    };

    const manejarCambioLogin = (e) => {
        const { name, value } = e.target;
        setDatosLogin({ ...datosLogin, [name]: value });
        console.log(name, value);
    };

    const registrarUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosRegistro)
                
            });
            
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setExitoMensaje(data.mensaje);
                setErrorMensaje('');
            } else {
                setErrorMensaje(data.mensaje);
                setExitoMensaje('');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const iniciarSesionUsuario = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/iniciarSesion', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosLogin)
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesionIniciada(true);
                setExitoMensaje(data.mensaje);
                setErrorMensaje('');
            } else {
                setErrorMensaje(data.mensaje);
                setExitoMensaje('');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const obtenerInfo = async () => {
        try {
            const response = await fetch('/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                const nuevaInfo = { mensaje: data.mensaje, usuario: data.usuario };
                setInfoMensaje(nuevaInfo);
            } else {
                setErrorMensaje(data.mensaje);
                setExitoMensaje('');
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error);
        }
    };

    const cerrarSesion = async () => {
        try {
            const response = await fetch('/cerrarSesion', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            console.log(data);
            if (data.ok) {
                setSesionIniciada(false);
                setExitoMensaje(data.mensaje);
                setErrorMensaje('');
            } else {
                setErrorMensaje(data.mensaje);
                setExitoMensaje('');
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    return (
        <div className="contenedor-formularios">
            <h1 className="h1-tp6">Trabajo N°6</h1>
            <div className="contenedor-formularios-seccion-uno">
                <div className="form-registro">
                    <h3 className="h2-form">Registro</h3>
                    <form className="form" onSubmit={registrarUsuario}>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="crear usuario"
                            className="input"
                            value={datosRegistro.usuario}
                            onChange={manejarCambioRegistro}
                        />
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="crear contraseña"
                            className="input"
                            value={datosRegistro.contrasena}
                            onChange={manejarCambioRegistro}
                        />
                        <button type="submit" className="button-registro">Registrar</button>
                    </form>
                </div>
                <div className="form-login">
                    <h3 className="h2-form">Iniciar Sesión</h3>
                    <form className="form" onSubmit={iniciarSesionUsuario}>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="ingresar usuario"
                            className="input"
                            value={datosLogin.usuario}
                            onChange={manejarCambioLogin}
                        />
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="ingresar contraseña"
                            className="input"
                            value={datosLogin.contrasena}
                            onChange={manejarCambioLogin}
                        />
                        <button type="submit" className="button-login">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
            {!sesionIniciada ? (
                <div className="contenedor-formularios-seccion-dos">
                    <div className="mensajes">
                        <p className="msj-error">{errorMensaje}</p>
                        <p className="msj-exito">{exitoMensaje}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="advertencia">Inicia sesión para ver esta información</p>
                    </div>
                </div>
            ) : (
                <div className="contenedor">
                    <div className="mensajes">
                        <p className="msj-error">{errorMensaje}</p>
                        <p className="msj-exito">{exitoMensaje}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="info-logeado">{infoMensaje.mensaje + " " + infoMensaje.usuario}</p>
                    </div>
                    <div className="botones-info">
                        <button className="info" onClick={obtenerInfo}>Ver info</button>
                        <button className="cerrar" onClick={cerrarSesion}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    )
}