
function App() {
    const [etapa, setEtapa] = useState('registrar');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);

    const manejarRegistro = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post('/registrar', { user: usuario, password: contrasena });
            setMensaje(respuesta.data.mensaje);
            setEtapa('registrado');
        } catch (error) {
            setMensaje(error.response.data.mensaje);
        }
    };

    const manejarInicioSesion = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.put('/login', { user: usuario, password: contrasena });
            setMensaje(respuesta.data.mensaje);
            setUsuarioLogueado(usuario);
            setEtapa('logueado');
        } catch (error) {
            setMensaje(error.response.data.mensaje);
        }
    };

    const obtenerInformacion = async () => {
        try {
            const respuesta = await axios.get('/info');
            setMensaje(`Información: ${respuesta.data.mensaje}, Usuario: ${respuesta.data.usuario}`);
        } catch (error) {
            setMensaje(error.response.data.mensaje);
        }
    };

    const manejarCerrarSesion = async () => {
        try {
            const respuesta = await axios.put('/logout');
            setMensaje(respuesta.data.mensaje);
            setEtapa('registrar');
            setUsuarioLogueado(null);
            setUsuario('');
            setContrasena('');
        } catch (error) {
            setMensaje(error.response.data.mensaje);
        }
    };

    return(
        <div className="container">
            <h1>App de Inicio de Sesión</h1>
            {etapa === 'registrar' && (
                <div>
                    <h2>Registrar</h2>
                    <form onSubmit={manejarRegistro}>
                        <label>Usuario:</label>
                        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                        <label>Contraseña:</label>
                        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                        <button type="submit">Registrar</button>
                    </form>
                </div>
            )}
            {etapa === 'registrado' && (
                <div>
                    <p>{mensaje}</p>
                    <button onClick={() => setEtapa('loguear')}>Iniciar sesión</button>
                </div>
            )}
            {etapa === 'loguear' && (
                <div>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={manejarInicioSesion}>
                        <label>Usuario:</label>
                        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                        <label>Contraseña:</label>
                        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <button onClick={() => setEtapa('registrar')}>Volver</button>
                </div>
            )}
            {etapa === 'logueado' && (
                <div>
                    <h2>Dashboard</h2>
                    <p>Usuario: {usuarioLogueado}</p>
                    <div className="actions">
                        <button onClick={obtenerInformacion}>Obtener información</button>
                        <button onClick={manejarCerrarSesion}>Cerrar sesión</button>
                    </div>
                    <p>{mensaje}</p>
                    <button onClick={() => setEtapa('registrar')}>Volver</button>
                </div>
            )}
        </div>
    );
}

