function App() {
    const [mensaje, setMensaje] = useState('')
    const [logeado, setLogeado] = useState(false)
    const [logeando, setLogeando] = useState(false)
    const [registrando, setRegistrando] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [mostrarInfoPage, setMostrarInfoPage] = useState(false)

    const handleChangeUser = (e) => {
        setUser(e.target.value)
        setError(false)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
        setError(false)
    }

    const handleLogin = () => {
        setLogeando(true)
    }

    const handleRegistro = () => {
        setRegistrando(true)
    }

    const handlePagina = () => {
        setMostrarInfoPage(false)
    }

    const registrar = async (e) => {
        e.preventDefault()
        if (!user || !password) {   
            setError(true)
            return
        }

        try {
            const response = await fetch('http://localhost:3000/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, password })
            })
            const data = await response.json()
            setMensaje(data.mensaje)
            setRegistrando(false)
        } catch (error) {
            console.log(error)
            setMensaje('Hubo un error al registrarse.')
        }
    }

    const login = async (e) => {
        e.preventDefault()
        if (!user || !password) { 
            setError(true)
            return
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, password })
            })

            if (response.status === 200) {
                const data = await response.json()
                setMensaje(data.mensaje)
                setLogeando(false)
                setLogeado(true)
            } else {
                setMensaje('Usuario o contraseña incorrectos.')
            }
        } catch (error) {
            console.log(error)
            setMensaje('Hubo un error al iniciar sesión')
        }
    }

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                setMensaje(data.mensaje)
                setLogeado(false)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Hubo un error al cerrar sesión.')
        }
    }

    const info = async () => {
        try {
            const response = await fetch('http://localhost:3000/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                const data = await response.json()
                setMensaje(data.mensaje)
                setMostrarInfoPage(true)
            }
        } catch (error) {
            console.log(error)
            setMensaje('Hubo un error al mostrar la información.')
        }
    }

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            <ul>
                {registrando ? (
                    <div>
                        <h1>Registro</h1>
                        <form onSubmit={registrar}>
                            <label htmlFor="user">Usuario:</label>
                            <input type="text" id="user" value={user} onChange={handleChangeUser} />
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" value={password} onChange={handleChangePassword} />
                            <li><button type="submit">Aceptar</button></li>
                            {error && <p>Complete todos los campos correctamente!!</p>}
                        </form>
                    </div>
                ) : logeando ? (
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={login}>
                            <label htmlFor="user">Usuario:</label>
                            <input type="text" id="user" value={user} onChange={handleChangeUser} />
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" value={password} onChange={handleChangePassword} />
                            <li><button type="submit">Aceptar</button></li>
                            {error && <p>Complete todos los campos!!</p>}
                        </form>
                    </div>
                ) : logeado ? (
                    mostrarInfoPage ? (
                        <div>
                            <p>{mensaje}</p>
                            <button onClick={handlePagina}>Volver</button>
                        </div>
                    ) : (
                        <div>
                            <li><button onClick={logout}>Logout</button></li>
                            <li><button onClick={info}>Info</button></li>
                        </div>
                    )
                    ) : (
                    <div>
                        <li><button onClick={handleRegistro}>Registrar</button></li>
                        <li><button onClick={handleLogin}>Login</button></li>
                    </div>
                )}
            </ul>
        </div>
    )
}