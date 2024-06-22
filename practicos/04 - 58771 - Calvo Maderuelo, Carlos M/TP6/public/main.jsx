const { useState } = React;

function App() {
    const [formularioActual, setFormularioActual] = useState('login');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [infoUsuario, setInfoUsuario] = useState(null);

    const cambiarFormulario = (formulario) => {
        setFormularioActual(formulario);
    };

    const agregarUsuario = async (e) => {
        e.preventDefault();
        const nombreUsuario = e.target.newUser.value;
        const contraseñaUsuario = e.target.newPassword.value;

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
        const nombreUsuario = e.target.user.value;
        const contraseñaUsuario = e.target.password.value;

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

    const mostrarLaInformacionDelUsuario = async () => {
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
            {isLoggedIn ? (
                <div>
                    <button onClick={mostrarLaInformacionDelUsuario}>Mostrar información</button>
                    {infoUsuario && (
                        <div className="datosUsuarios">
                            <p>Usuario: {infoUsuario.username}</p>
                            <p>Contraseña: {infoUsuario.password}</p>
                        </div>
                    )}
                    <hr></hr>
                    <button onClick={cerrarSesion}>Cerrar Sesión</button>
                </div>
            ) : (
                <div>
                    {formularioActual === 'login' && (
                        <div>
                            <form onSubmit={iniciarSesion}>
                                <h2>Iniciar Sesión</h2>
                                <hr></hr>
                                <label>
                                    <p>Usuario:</p>
                                    <input type="text" name="user" id="user" />
                                </label>
                                <br />
                                <label>
                                    <p>Contraseña:</p>
                                    <input type="password" name="password" id="password" />
                                </label>
                                <br />
                                <button type="submit">Iniciar Sesión</button>
                                <button type="button" onClick={() => cambiarFormulario('registro')}>
                                    Registrar nuevo usuario
                                </button>
                            </form>
                        </div>
                    )}
                    {formularioActual === 'registro' && (
                        <div>
                            <form onSubmit={agregarUsuario}>
                                <h2>Agregar un nuevo usuario</h2>
                                <hr></hr>
                                <label>
                                    <p>Usuario nuevo:</p>
                                    <input type="text" name="newUser" id="newUser" />
                                </label>
                                <br />
                                <label>
                                    <p>Contraseña nueva:</p>
                                    <input type="password" name="newPassword" id="newPassword" />
                                </label>
                                <br />
                                <button type="submit">Guardar</button>
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
