function App() {
    const [usuario, setUsuario] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [infoUsuario, setInfoUsuario] = useState(null)

    const manejarRegistro = async () => {
        const respuesta = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: contrasena })
        })
        const datos = await respuesta.json()
        setMensaje(datos.message)
    };

    const manejarInicioSesion = async () => {
        const respuesta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: contrasena })
        })
        const datos = await respuesta.json()
        setMensaje(datos.message)
    }

    const manejarCierreSesion = async () => {
        const respuesta = await fetch('http://localhost:3000/logout', {
            method: 'POST'
        })
        const datos = await respuesta.json()
        setMensaje(datos.message)
        setInfoUsuario(null)
    }

    const manejarObtenerInfo = async () => {
        const respuesta = await fetch('http://localhost:3000/info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const datos = await respuesta.json()
        if (respuesta.ok) {
            setInfoUsuario(datos)
        } else {
            setMensaje(datos.message)
        }
    }

    return (
        <div>
            <h2>Autenticación</h2>
            <input 
                type="text" 
                placeholder="Usuario" 
                value={usuario} 
                onChange={(e) => setUsuario(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
            />
            <button onClick={manejarRegistro}>Registrar</button>
            <button onClick={manejarInicioSesion}>Iniciar Sesión</button>
            <button onClick={manejarCierreSesion}>Cerrar Sesión</button>
            <button onClick={manejarObtenerInfo}>Obtener Info</button>
            <p>{mensaje}</p>
            {infoUsuario && <div>
                <h3>Información del Usuario</h3>
                <p>Usuario: {infoUsuario.username}</p>
            </div>}
        </div>
    )
}