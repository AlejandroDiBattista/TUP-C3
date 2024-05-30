const { useState, useEffect } = React;
const API_KEY = "30d38b26954359266708f92e1317dac0";

function App() {
  const [clima, setClima] = useState(null);
  const [ciudadSelec, setCiudadSelec] = useState("Tucuman");
  const [buscarInput, setBuscarInput] = useState("");
  const iconoUrl = clima ? `./iconos/${clima.weather[0].icon}.svg` : "";

  const fetchClima = async (ciudad) => {
    const respuesta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
    );
    const datos = await respuesta.json();
    setClima(datos);
  };

  useEffect(() => {
    fetchClima(ciudadSelec);
  }, []);

  const ciudadesClick = async (ciudad) => {
    setCiudadSelec(ciudad);
    await fetchClima(ciudad);
  };

  const cambioBuscar = (evento) => {
    setBuscarInput(evento.target.value);
  };

  const manejarBuscar = async () => {
    setCiudadSelec(buscarInput);
    await fetchClima(buscarInput);
    setBuscarInput("");
  };

  const apretarEnter = (evento) => {
    if (evento.key === "Enter") {
      manejarBuscar();
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <strong className="titulo">Clima</strong>
          </li>
        </ul>
        <ul className="ciudades">
          <li>
            <a
              href="#"
              className="ciudad"
              onClick={() => ciudadesClick("Tucuman")}
            >
              Tucuman
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ciudad"
              onClick={() => ciudadesClick("Salta")}
            >
              Salta
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ciudad"
              onClick={() => ciudadesClick("Buenos Aires")}
            >
              Buenos Aires
            </a>
          </li>
        </ul>
      </nav>

      <input
        className="buscar"
        type="search"
        placeholder="Buscar"
        aria-label="Buscar"
        value={buscarInput}
        onChange={cambioBuscar}
        onKeyDown={apretarEnter}
      />

      <main>
        {ciudadSelec && clima && (
          <>
            <article className="contenedor">
              <header>
                <h2>{ciudadSelec}</h2>
              </header>
              <div className="iconos">
                <img src={iconoUrl} alt="Clima Icono" />
              </div>
              <footer>
                <h2>Temperatura: {clima.main.temp}C°</h2>
                <p>
                  Minima: {clima.main.temp_min}C°/ Maxima: {clima.main.temp_max}
                  C°
                </p>
                <p>Humedad: {clima.main.humidity}%</p>
              </footer>
            </article>
          </>
        )}
      </main>
    </>
  );
}
