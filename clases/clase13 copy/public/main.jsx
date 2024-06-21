function App() {
    let [mensaje, setMensaje] = useState("")

    async function fetchApi(url, method = "GET", body = {}) {
        let res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        let data = await res.json()
        setMensaje(data)
    }
    
    const Api = {
        get: (url) => fetchApi(url, "GET"),
        put: (url, body = {}) => fetchApi(url, "PUT", body),
        post: (url, body = {}) => fetchApi(url, "POST", body),
        delete: (url) => fetchApi(url, "DELETE"),
    }
    
    const usuarios = () => Api.get('/usuarios');
    const registrar = () => Api.post('/registrar', { user: "adibattista", password: "00000000" });
    const login = () => Api.put('/login', { user: "adibattista", password: "00000000" });
    const logout = () => Api.put('/logout');
    const info = () => Api.get('/info');

    return (
        <div>
            <h2>Simular Sesión</h2>
            <ul>
                <li><button onClick={usuarios}>Usuarios</button></li>
                <li><button onClick={registrar}>Registrar</button></li>
                <li><button onClick={login}>Login</button></li>
                <li><button onClick={logout}>Logout</button></li>
                <li><button onClick={info}>Info</button></li>
            </ul>
            <pre>{JSON.stringify(mensaje,null,2)}</pre>
        </div>
    )
}