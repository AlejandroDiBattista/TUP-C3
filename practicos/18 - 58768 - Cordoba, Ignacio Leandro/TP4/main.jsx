const { useState, useEffect } = React;
const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [clima, setClima] = useState(null);
    const [ciudad, setCiudad] = useState("Tucuman");
    const [buscar, setBuscar] = useState("");
    const iconoUrl = clima ? `./iconos/${clima.weather[0].icon}.svg` : "";

    const fetchClima = async (ciudad) => {
        const respuesta = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
        );
        const datos = await respuesta.json();
        setClima(datos);
      };

    useEffect(() => {
        fetchClima(ciudad);
    }, [ciudad]);

    const ClickCiudad = async (lugar) => {
        setCiudad(lugar);
        await fetchClima(lugar);
    };

    const CambioBuscar = (evento) => {
        setBuscar(evento.target.value);
    };

    const manejarBusqueda = () => {
        if (buscar.trim() !== "") {
            setCiudad(buscar);
            setBuscar("");
        }
    };

    const Enter = (evento) => {
        if (evento.key === "Enter") {
            manejarBusqueda();
        }
    };

    return (
        <>
            <nav>
                <h1>Clima</h1>
                <ul className="ciudades">
                    <li>
                        <a href="#" className="ciudad" onClick={() => ClickCiudad("Tucuman")}>Tucuman</a>
                    </li>
                    <li>
                        <a href="#" className="ciudad" onClick={() => ClickCiudad("Salta")}>Salta</a>
                    </li>
                    <li>
                        <a href="#" className="ciudad" onClick={() => ClickCiudad("Buenos Aires")}>Buenos Aires</a>
                    </li>
                </ul>
            </nav>

            <input
                className="buscar"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={buscar}
                onChange={CambioBuscar}
                onKeyDown={Enter}
            />

            <main>
                {ciudad && clima && (
                    <article className="contenedor">
                        <header>
                            <h2>{ciudad}</h2>
                        </header>
                        <div className="iconos">
                            <img src={iconoUrl} alt="Climas" />
                        </div>
                        <footer>
                            <h2>Temperatura: {clima.main.temp}°C</h2>
                            <p>Minima: {clima.main.temp_min}°C / Maxima: {clima.main.temp_max}°C</p>
                            <p>Humedad: {clima.main.humidity}%</p>
                        </footer>
                    </article>
                )}
            </main>
        </>
    );
}
