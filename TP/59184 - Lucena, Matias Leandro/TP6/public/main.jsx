const { useState } = React;

function App() {
    const [formularioActual, setFormularioActual] = useState('login');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [infoUsuario, setInfoUsuario] = useState(null);

    const cambiarFormulario = (formulario) => {
        setFormularioActual(formulario);
    };

    const registrarUsuario = async (e) => {
        e.preventDefault();
        const nombreUsuario = e.target.nuevoUsuario.value;
        const contraseñaUsuario = e.target.nuevaContraseña.value;

        try {
            const respuesta = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: nombreUsuario, password: contraseñaUsuario }),
            });

            if (!respuesta.ok) {
                throw new Error('Error al registrar usuario');
            }

            const datos = await respuesta.json();
            alert(datos.message || 'Usuario registrado correctamente');
            setFormularioActual('login');
        } catch (error) {
            alert('Error al registrar usuario');
            console.error('Error:', error);
        }
    };

    const iniciarSesion = async (e) => {
        e.preventDefault();
        const nombreUsuario = e.target.usuario.value;
        const contraseñaUsuario = e.target.contraseña.value;

        try {
            const respuesta = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: nombreUsuario, password: contraseñaUsuario }),
            });

            if (respuesta.ok) {
                setLoggedIn(true);
                alert('Inicio de sesión exitoso');
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            alert('Error al iniciar sesión');
            console.error('Error:', error);
        }
    };

    const cerrarSesion = async () => {
        try {
            const respuesta = await fetch('/api/logout', {
                method: 'POST',
            });

            if (!respuesta.ok) {
                throw new Error('Error al cerrar sesión');
            }

            setLoggedIn(false);
            setInfoUsuario(null);
            alert('Sesión cerrada correctamente');
        } catch (error) {
            alert('Error al cerrar sesión');
            console.error('Error:', error);
        }
    };

    const obtenerInformacionUsuario = async () => {
        try {
            const respuesta = await fetch('/api/info');
            const datos = await respuesta.json();

            if (respuesta.ok) {
                setInfoUsuario(datos);
            } else {
                throw new Error('Error al obtener la información del usuario');
            }
        } catch (error) {
            alert('Error al obtener la información del usuario');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>TP6 - Gestión de Sesiones</h1>
            {isLoggedIn ? (
                <div>
                    <h2>Bienvenido</h2>
                    <button onClick={obtenerInformacionUsuario}>Ver Información</button>
                    {infoUsuario && (
                        <div>
                            <p>Usuario: {infoUsuario.username}</p>
                            <p>Contraseña: {infoUsuario.password}</p>
                        </div>
                    )}
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    {formularioActual === 'login' && (
                        <div>
                            <h2>Iniciar Sesión</h2>
                            <form onSubmit={iniciarSesion}>
                                <label>
                                    Usuario:
                                    <input type="text" name="usuario" id="usuario" />
                                </label>
                                <br />
                                <label>
                                    Contraseña:
                                    <input type="password" name="contraseña" id="contraseña" />
                                </label>
                                <br />
                                <button type="submit">Iniciar Sesión</button>
                                <button type="button" onClick={() => cambiarFormulario('registro')}>
                                    Registrar
                                </button>
                            </form>
                        </div>
                    )}
                    {formularioActual === 'registro' && (
                        <div>
                            <h2>Registrar Nuevo Usuario</h2>
                            <form onSubmit={registrarUsuario}>
                                <label>
                                    Nuevo Usuario:
                                    <input type="text" name="nuevoUsuario" id="nuevoUsuario" />
                                </label>
                                <br />
                                <label>
                                    Nueva Contraseña:
                                    <input type="password" name="nuevaContraseña" id="nuevaContraseña" />
                                </label>
                                <br />
                                <button type="submit">Registrar</button>
                                <button type="button" onClick={() => cambiarFormulario('login')}>
                                    Iniciar Sesión
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
