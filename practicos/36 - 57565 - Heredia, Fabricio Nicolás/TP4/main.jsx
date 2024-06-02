const { useState, useEffect } = React;
const API_KEY = '30d38b26954359266708f92e1317dac0';

function App() {
    const [datosClima, setDatosClima] = useState(null);
    const [ciudadActual, setCiudadActual] = useState("Tucuman");
    const [entradaBusqueda, setEntradaBusqueda] = useState("");
    const urlIcono = datosClima ? `./openweathermap/${datosClima.weather[0].icon}.svg` : "";

    useEffect(() => {
        obtenerDatosClima(ciudadActual);
    }, [ciudadActual]);

    const obtenerDatosClima = async (ciudad) => {
            const respuesta = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
            );
            const datos = await respuesta.json();
            setDatosClima(datos);
    };

    const manejarClickCiudad = (ciudad) => {
        setCiudadActual(ciudad);
    };

    const manejarCambioBusqueda = (evento) => {
        setEntradaBusqueda(evento.target.value);
    };

    const manejarBusqueda = () => {
        if (entradaBusqueda.trim() !== "") {
            setCiudadActual(entradaBusqueda);
            setEntradaBusqueda("");
        }
    };

    const manejarTeclaEnter = (evento) => {
        if (evento.key === "Enter") {
            manejarBusqueda();
        }
    };

    return (
        <div>
            <Navegacion manejarClickCiudad={manejarClickCiudad} />
            <Buscador
                entradaBusqueda={entradaBusqueda}
                manejarCambioBusqueda={manejarCambioBusqueda}
                manejarTeclaEnter={manejarTeclaEnter}
            />
            <ContenidoClima ciudadActual={ciudadActual} datosClima={datosClima} urlIcono={urlIcono} />
        </div>
    );
}

const Navegacion = ({ manejarClickCiudad }) => (
    <nav>
        <h1>Clima</h1>
        <ul className="lista-ciudades">
            <li><a href="#" className="enlace-ciudad" onClick={() => manejarClickCiudad("Tucuman")}>Tucuman</a></li>
            <li><a href="#" className="enlace-ciudad" onClick={() => manejarClickCiudad("Salta")}>Salta</a></li>
            <li><a href="#" className="enlace-ciudad" onClick={() => manejarClickCiudad("Buenos Aires")}>Buenos Aires</a></li>
        </ul>
    </nav>
);

const Buscador = ({ entradaBusqueda, manejarCambioBusqueda, manejarTeclaEnter }) => (
    <input
        className="entrada-busqueda"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        value={entradaBusqueda}
        onChange={manejarCambioBusqueda}
        onKeyDown={manejarTeclaEnter}
    />
);

const ContenidoClima = ({ ciudadActual, datosClima, urlIcono }) => (
    <main>
        {ciudadActual && datosClima && (
            <article className="contenedor-clima">
                <header>
                    <h2>{ciudadActual}</h2>
                </header>
                <div className="icono-clima">
                    <img src={urlIcono} alt="Icono del clima" />
                </div>
                <footer>
                    <h2>Temperatura: {datosClima.main.temp}°C</h2>
                    <p>Mínima: {datosClima.main.temp_min}°C / Máxima: {datosClima.main.temp_max}°C</p>
                    <p>Humedad: {datosClima.main.humidity}%</p>
                </footer>
            </article>
        )}
    </main>
);