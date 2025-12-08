const { useState, useEffect } = React;

const API_CLAVE = "24aab2eb8aec803263f83e8daefaa6f4";

const AppClima = () => {
    const [clima, setClima] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("Madrid");
    const [entradaBuscar, setEntradaBuscar] = useState("");
    const urlIcono = clima ? `./openweathermap/${clima.weather[0].icon}.svg` : "";

    const obtenerClima = async (ciudad) => {
        const respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_CLAVE}&units=metric`
        );
        const datos = await respuesta.json();
        setClima(datos);
    };

    useEffect(() => {
        obtenerClima(ciudadSeleccionada);
    }, [ciudadSeleccionada]);

    const manejarClickCiudad = async (ciudad) => {
        setCiudadSeleccionada(ciudad);
        await obtenerClima(ciudad);
    };

    const cambioEntradaBuscar = (evento) => {
        setEntradaBuscar(evento.target.value);
    };

    const manejarBuscar = async () => {
        if (entradaBuscar.trim() !== "") {
            setCiudadSeleccionada(entradaBuscar);
            await obtenerClima(entradaBuscar);
            setEntradaBuscar("");
        }
    };

    const manejarTeclaPresionada = (evento) => {
        if (evento.key === "Enter") {
            manejarBuscar();
        }
    };

    const ciudades = ["Tucumán", "Salta", "Buenos Aires"];
    
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <h1 className="title">Sitio Web del clima</h1>
                    </li>
                </ul>
                <ul className="ciudades">
                    {ciudades.map((ciudad, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="ciudad"
                                onClick={() => manejarClickCiudad(ciudad)}
                            >
                                {ciudad}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <input className="search"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                value={entradaBuscar}
                onChange={cambioEntradaBuscar}
                onKeyDown={manejarTeclaPresionada}
            />

            <div className="Ciudad_Clima">
                {ciudadSeleccionada && clima && (
                    <>
                        <article className="datos">
                            <header>
                                <h2>{ciudadSeleccionada}</h2>
                            </header>
                            <div className="iconos">
                                <img src={urlIcono} alt="Icono del Clima" />
                            </div>
                            <footer>
                                <h2>Temperatura: {clima.main.temp}C°</h2>
                                <p>
                                    Mínima: {clima.main.temp_min}C° / Máxima: {clima.main.temp_max}C°
                                </p>
                                <p>Humedad: {clima.main.humidity}%</p>
                            </footer>
                        </article>
                    </>
                )}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppClima />);
