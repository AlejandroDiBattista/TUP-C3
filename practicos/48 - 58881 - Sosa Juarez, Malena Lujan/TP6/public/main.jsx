function App() {
    const [usuarioRegistro, setUsuarioRegistro] = useState({ userId: '', userPassword: '' })
    const [usuarioLogin, setUsuarioLogin] = useState({ userId: '', userPassword: '' })
    const [sesionActiva, setSesionActiva] = useState(false)
    const [errorMsj, setErrorMsj] = useState('')
    const [exitoMsj, setExitoMsj] = useState('')
    const [infoMsj, setInfoMsj] = useState({ message: '', userId: '' })

    const cambioRegistro = (e) => {
        const { name, value } = e.target
        setUsuarioRegistro({ ...usuarioRegistro, [name]: value })
        console.log(name, value)
    }

    const cambioLogin = (e) => {
        const { name, value } = e.target
        setUsuarioLogin({ ...usuarioLogin, [name]: value })
        console.log(name, value)
    }

    const registrarUsuario = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioRegistro)
            });
            const data = await response.json()
            console.log(data)
            if (data.ok) {
                setExitoMsj(data.message)
                setErrorMsj('')
            } else {
                setErrorMsj(data.message)
                setExitoMsj('')
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error)
        }
    }

    const iniciarSesionUsuario = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/login', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(usuarioLogin)
            });
            const data = await response.json()
            console.log(data)
            if (data.ok) {
                setSesionActiva(true)
                setExitoMsj(data.message)
                setErrorMsj('')
            } else {
                setErrorMsj(data.message)
                setExitoMsj('')
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error)
        }
    }

    const obtenerInformacion = async () => {
        try {
            const response = await fetch('/userInfo', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            console.log(data)
            if (data.ok) {
                const nuevaInformacion = { message: data.message, userId: data.userId }
                setInfoMsj(nuevaInformacion)
            } else {
                setErrorMsj(data.message)
                setExitoMsj('')
            }
        } catch (error) {
            console.error('Error al obtener información del usuario:', error)
        }
    }

    const cerrarSesionUsuario = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()
            console.log(data)
            if (data.ok) {
                setSesionActiva(false)
                setExitoMsj(data.message)
                setErrorMsj('')
            } else {
                setErrorMsj(data.message)
                setExitoMsj('')
            }
        } catch (error) {
            console.error('Error al cerrar sesión', error)
        }
    }

    return (
        <div className="contenedor-formularios">
            <h1 className="h1-tp6">TP6 - Sesiones</h1>
            <div className="contenedor-formularios-seccion-uno">
                <div className="form-registro">
                    <h2 className="h2-form">Registro</h2>
                    <form className="form" onSubmit={registrarUsuario}>
                        <input
                            type="text"
                            name="userId"
                            placeholder="USUARIO"
                            className="input"
                            value={usuarioRegistro.userId}
                            onChange={cambioRegistro}
                        />
                        <input
                            type="password"
                            name="userPassword"
                            placeholder="CONTRASEÑA"
                            className="input"
                            value={usuarioRegistro.userPassword}
                            onChange={cambioRegistro}
                        />
                        <button type="submit" className="button-registro">Registrar</button>
                    </form>
                </div>
                <div className="form-login">
                    <h2 className="h2-form">Iniciar Sesión</h2>
                    <form className="form" onSubmit={iniciarSesionUsuario}>
                        <input
                            type="text"
                            name="userId"
                            placeholder="USUARIO"
                            className="input"
                            value={usuarioLogin.userId}
                            onChange={cambioLogin}
                        />
                        <input
                            type="password"
                            name="userPassword"
                            placeholder="CONTRASEÑA"
                            className="input"
                            value={usuarioLogin.userPassword}
                            onChange={cambioLogin}
                        />
                        <button type="submit" className="button-login">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
            {!sesionActiva ? (
                <div className="contenedor-formularios-seccion-dos">
                    <div className="mensajes">
                        <p className="msj-error">{errorMsj}</p>
                        <p className="msj-exito">{exitoMsj}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="p-info-usuario-logeado">INICIA SESIÓN PARA VER ESTA INFORMACIÓN</p>
                    </div>
                </div>
            ) : (
                <div className="contenedor-formularios-seccion-dos">
                    <div className="mensajes">
                        <p className="msj-error">{errorMsj}</p>
                        <p className="msj-exito">{exitoMsj}</p>
                    </div>
                    <div className="info-usuario-logeado">
                        <p className="p-info-usuario-logeado">{infoMsj.message + " " + infoMsj.userId}</p>
                    </div>
                    <div className="contenedor-botones-usuario-logeado">
                        <button className="btn-ver-info" onClick={obtenerInformacion}>Ver Info</button>
                        <button className="btn-cerrar-sesion" onClick={cerrarSesionUsuario}>Cerrar Sesión</button>
                    </div>
                </div>
            )}
        </div>
    )}