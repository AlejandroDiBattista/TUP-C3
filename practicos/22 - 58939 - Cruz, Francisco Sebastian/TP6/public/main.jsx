function App() {
    
    const [nombreUsuario, setnombreUsuario] = useState(''); 
        const [contraseña, setContraseña] = useState(''); 
        const [mensaje, setMensaje] = useState(''); 
        const [modo, setModo] = useState('registrar'); 
        const [estaLogueado, setusuarioLogeado] = useState(false); 
        const [mostrarInfo, setMuestroInfo] = useState(false); 
    
        useEffect(() => {
            const valordeCookie = getCookie('usuario');
            if (valordeCookie) {
                setusuarioLogeado(true);
                setnombreUsuario(valordeCookie);
            }
        }, []);
    
        const getCookie = (nombre) => {
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ');
            for (let cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName === nombre) {
                    return cookieValue;
                }
            }
            return null;
        };
        const manejoRegistro = async (e) => {
            e.preventDefault();
            if (!nombreUsuario || !contraseña) {
                setMensaje('Por favor, complete todos estos campos');
                return;
            }
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario, contraseña }),
            });
            const data = await response.json();
            if (response.ok) {
                setMensaje(data.message);
                setnombreUsuario('');
                setContraseña('');
            } else {
                setMensaje(data.error);
            }
        };
        const manejoInicioSesion = async (e) => {
            e.preventDefault();
            if (!nombreUsuario || !contraseña) {
                setMensaje('Por favor, complete todos estos campos');
                return;
            }
    
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreUsuario, contraseña }),
            });
    
            const data = await response.json();
            if (response.ok) {
                setMensaje('Usuario Logueado Correctamente');
                setusuarioLogeado(true);
                setModo('Logueado');
            } else {
                setMensaje(data.error || 'Usuario o Contraseña Incorrectos');
            }
        };
        const manejardeCierreSesion = async () => {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setMensaje('Usuario deslogueado correctamente');
                setusuarioLogeado(false);
                setModo('registrar');
                setnombreUsuario('');
                setContraseña('');
                setMuestroInfo(false);
            }
        };
        const modoCambiar = (modoCambiar) => {
            setModo(modoCambiar);
            setMensaje('');
            setnombreUsuario('');
            setContraseña('');
        };
        const manejoVerInfo = () => {
            setMuestroInfo(!mostrarInfo);
        };
        return (
            <div className="card">
                <div className="container">
                    <h2>{modo === 'registrar' ? 'Registro de Usuario' : 'Login de Usuario'}</h2>
                    {!estaLogueado ? (
                        <form onSubmit={modo === 'registrar' ? manejoRegistro : manejoInicioSesion}>
                            <div>
                                <label>Usuario :</label>
                                <input
                                    type="text"
                                    value={nombreUsuario}
                                    onChange={(e) => setnombreUsuario(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Contraseña :</label>
                                <input
                                    type="password"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                />
                             </div>
                            {modo === 'registrar' ? (
                                <button type="submit">Registrar</button>
                            ) : modo === 'login' ? (
                                <button type="submit">Iniciar Sesión</button>
                            ) : null}
                           </form>
                    ) : (
                        <>
                            <button onClick={manejardeCierreSesion}>Cerrar Sesión</button>
                            <button onClick={manejoVerInfo}>Ver info</button>
                        </>
                    )}
                    {modo === 'registrar' && !estaLogueado && (
                        <button onClick={() => modoCambiar('login')}>Iniciar Sesión</button>
                    )}
                    {modo === 'login' && !estaLogueado && (
                        <button onClick={() => modoCambiar('registrar')}>Registrar</button>
                    )}
                    {mostrarInfo && estaLogueado && (
                        <div>
                            <p>Usuario: {nombreUsuario}</p>
                            <p>Contraseña: {contraseña}</p>
                        </div>
                    )}
                    <p>{mensaje}</p>
                </div>
            </div>
        );
    }
    export default App;
