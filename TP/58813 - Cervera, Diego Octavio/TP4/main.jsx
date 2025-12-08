const { useState, useEffect } = React;
const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [clima, setClima] = useState(null);
    const [ciudadElegida, setCiudadElegida] = useState("Tucuman");
    const [barraBuscar, setBarraBuscar] = useState("");
    const [error, setError] = useState("");
    const iconoUrl = clima ? `./iconos/${clima.weather[0].icon}.svg` : "";

    const fetchClima = async (ciudad) => {
        try {
            const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`);
            if (!respuesta.ok) {
                throw new Error("Ciudad no encontrada");
            }
            const datos = await respuesta.json();
            setClima(datos);
            setError("");
        } catch (error) {
            setError(error.message);
            setClima(null);
        }
    };

    useEffect(() => { fetchClima(ciudadElegida); }, []);

    const clickProvincia = async (ciudad) => {
        setCiudadElegida(ciudad);
        await fetchClima(ciudad);
    };

    const escribeBuscar = e => {
        setBarraBuscar(e.target.value);
    };

    const presionEnter = async (e) => {
        if (e.key === "Enter") {
            setCiudadElegida(barraBuscar);
            await fetchClima(barraBuscar);
            setBarraBuscar("");
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <b className="clima">Clima</b>
                    </li>
                </ul>
                <ul className="ciudades">
                    <li>
                        <a href="#" className="ciudad" onClick={() => clickProvincia("Tucuman")}><b>Tucuman</b></a>
                    </li>
                    <li>
                        <a href="#" className="ciudad" onClick={() => clickProvincia("Salta")}><b>Salta</b></a>
                    </li>
                    <li>
                        <a href="#" className="ciudad" onClick={() => clickProvincia("Buenos Aires")}><b>Buenos Aires</b></a>
                    </li>
                </ul>
            </nav>

            <input
                className="buscar"
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={barraBuscar}
                onChange={escribeBuscar}
                onKeyDown={presionEnter}
            />

            <main>
                {error && <p className="error"><b>{error}</b></p>}
                {ciudadElegida && clima && !error && (
                    <>
                        <article className="contenedor">
                            <header>
                                <h2>{ciudadElegida.charAt(0).toUpperCase() + ciudadElegida.slice(1).toLowerCase()}</h2>
                            </header>
                            <div className="iconos">
                                <img src={iconoUrl} alt="Clima Icono" />
                            </div>
                            <footer>
                                <h2>Temperatura: {clima.main.temp}C°</h2>
                                <p>Minima: {clima.main.temp_min}C°/ Maxima: {clima.main.temp_max} C°</p>
                                <p>Humedad: {clima.main.humidity}</p>
                            </footer>
                        </article>
                    </>
                )}
            </main>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
