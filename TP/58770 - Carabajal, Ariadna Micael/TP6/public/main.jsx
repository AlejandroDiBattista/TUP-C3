function App() {
    const [cuenta, setCuenta] = useState({ usuario: '', contrasena: '' });
    const [mensaje, setMensaje] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [sesion, setSesion] = useState(() => {
        const usuarioLogueado = localStorage.getItem('usuarioLogueado');
        return usuarioLogueado ? true : false;
    });
    const [infoUsuario, setInfoUsuario] = useState(() => {
        const usuarioInfo = localStorage.getItem('infoUsuario');
        try {
            return usuarioInfo ? JSON.parse(usuarioInfo) : null;
        } catch (error) {
            return null;
        }
    });    

    const login = async (e) => {
        e.preventDefault();
        if (cuenta.usuario.trim() === '' || cuenta.contrasena.trim() === '') {
            setMensaje('Por favor, complete ambos campos.');
            return;
        }
        try {
            const respuesta = await fetch('http://localhost:3000/login', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ usuario: cuenta.usuario, contrasena: cuenta.contrasena })
            });
            console.log('Fetch completado:', respuesta);
            const datos = await respuesta.json();
            setMensaje(datos.message);
            if (respuesta.ok) {
                localStorage.setItem('usuarioLogueado', 'true');
                localStorage.setItem('infoUsuario', JSON.stringify({ username: cuenta.usuario }));
                setSesion(true);
                setInfoUsuario({ username: cuenta.usuario });
            } else if (respuesta.status === 404) {
                setMensaje('La cuenta especificada no existe.');
            } else {
                setMensaje('La cuenta ya está conectada.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            setMensaje('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
            setSesion(false);
            setInfoUsuario(null);
        }
    };

    const registrar = async (e) => {
        e.preventDefault();
        if (cuenta.usuario.trim() === '' || cuenta.contrasena.trim() === '') {
            setMensaje('Por favor, complete ambos campos.');
            return;
        }
        try {
            const respuesta = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ usuario: cuenta.usuario, contrasena: cuenta.contrasena })
            });
            const datos = await respuesta.json();
            setMensaje(datos.message);
            if (respuesta.ok) {
                localStorage.setItem('infoUsuario', JSON.stringify({ username: cuenta.usuario }));
                setInfoUsuario({ username: cuenta.usuario });
                cambiarForm();
            } else {
                setMensaje('La cuenta especificada ya existe.');
            }
            localStorage.removeItem('usuarioLogueado');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    const manejarLogout = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/logout', {
                method: 'POST'
            });
            const datos = await respuesta.json();
            setMensaje(datos.message);
            setSesion(false);
            setInfoUsuario(null);
            localStorage.removeItem('usuarioLogueado');
            localStorage.removeItem('infoUsuario');
        } catch (error) {
            console.error('Error al cerrar sesión', error);
        }
    };

    useEffect(() => {
        if (sesion && !infoUsuario) {
            manejarObtenerInfo();
        }
    }, []);

    const manejarObtenerInfo = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/informacion', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const datos = await respuesta.json();
            if (respuesta.ok) {
                localStorage.setItem('infoUsuario', JSON.stringify(datos.usuario));
                setInfoUsuario(datos.usuario);
                setMensaje('');
            } else {
                setInfoUsuario(null);
                setMensaje(datos.message);
            }
        } catch (error) {
            console.error('Error al obtener información del usuario', error);
            setInfoUsuario(null);
            setMensaje('Error al obtener información del usuario. Por favor, inténtelo de nuevo.');
        }
    };

    const manejarInput = (e) => {
        const { name, value } = e.target;
        setCuenta({ ...cuenta, [name]: value });
    };

    const cambiarForm = () => {
        setMensaje('');
        setCuenta({ usuario: '', contrasena: '' });
        setSesion(false);
        setMostrarForm(!mostrarForm);
    };

    const renderForm = () => {
        if (!sesion) {
            if (mostrarForm) {
                return (
                    <div>
                        <h1>Crear una cuenta</h1>
                        <form onSubmit={registrar}>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="usuario"
                                    value={cuenta.usuario}
                                    onChange={manejarInput}
                                />
                                <label htmlFor="usuario">Usuario</label>
                            </div>
                            <div className="form-control">
                                <input
                                    type="password"
                                    name="contrasena"
                                    value={cuenta.contrasena}
                                    onChange={manejarInput}
                                />
                                <label htmlFor="contrasena">Contraseña</label>
                            </div>
                            {mensaje && <p className="error-mensaje">{mensaje}</p>}
                            <button className="aceptar-btn" type="submit">Registrarse</button>
                        </form>

                        <p className="texto">Ya tienes una cuenta? <button className='cambiar-form-btn' onClick={cambiarForm}>Acceder</button></p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <h1>Acceda a su cuenta</h1>
                        <form onSubmit={login}>
                            <div className="form-control">
                                <input
                                    type="text"
                                    name="usuario"
                                    value={cuenta.usuario}
                                    onChange={manejarInput}
                                />
                                <label htmlFor="usuario">Usuario</label>
                            </div>
                            <div className="form-control">
                                <input
                                    type="password"
                                    name="contrasena"
                                    value={cuenta.contrasena}
                                    onChange={manejarInput}
                                />
                                <label htmlFor="contrasena">Contraseña</label>
                            </div>
                            {mensaje && <p className="error-mensaje">{mensaje}</p>}
                            <button className="aceptar-btn" type="submit">Acceder</button>
                        </form>
                        <p className="texto">No tienes una cuenta? <button className='cambiar-form-btn' onClick={cambiarForm}>Registrarse</button></p>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <h1>Información del Usuario</h1>
                    <p>Le damos la bienvenida, <b>{infoUsuario && infoUsuario.username}</b></p>
                    <button className='aceptar-btn' onClick={manejarLogout}>Cerrar Sesión</button>
                    <p>{mensaje}</p>
                </div>
            );
        }
    };

    const renderInfoSecreta = () => {
        if (sesion) {
            return (
                <div>
                    <h2>Info secreta</h2>
                    <button className="aceptar-btn" onClick={mostrarInfoSecreta}>Mostrar Información Secreta</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Info secreta</h2>
                    <p className="info">No tienes acceso. Por favor, inicia sesión para ver la información secreta.</p>
                </div>
            );
        }
    };

    const mostrarInfoSecreta = () => {
        alert('Info secreta desbloqueada!');
    };

    return (
        <div>
            <div className="form-contenedor">
                {renderForm()}
                {renderInfoSecreta()}
            </div>
        </div>
    );
}