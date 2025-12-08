const API_KEY = "30d38b26954359266708f92e1317dac0";

const Encabezado = ({ cambiarCiudad }) => (
  <nav>
    <ul>
      <li>
        <h1>Clima</h1>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#" onClick={() => cambiarCiudad("Tucuman")}>
          Tucumán
        </a>
      </li>
      <li>
        <a href="#" onClick={() => cambiarCiudad("Salta")}>
          Salta
        </a>
      </li>
      <li>
        <a href="#" onClick={() => cambiarCiudad("Buenos Aires")}>
          Buenos Aires
        </a>
      </li>
    </ul>
  </nav>
);

const BarraBusqueda = ({ buscarCiudad }) => (
  <div className="barra-busqueda">
    <input
      type="search"
      name="buscar"
      placeholder="Buscar Ciudad"
      aria-label="Buscar Ciudad"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          buscarCiudad(e.target.value);
        }
      }}
    />
  </div>
);

const TarjetaClima = ({
  ciudad,
  temperatura,
  minima,
  maxima,
  humedad,
  icono,
}) => (
  <article className="card">
    <header className="card-header">
      <h2>{ciudad}</h2>
      <hr />
    </header>
    <div className="icon-container">
      <hr />
      <img
        src={`./iconos/${icono}`}
        alt="icono clima"
        className="icono-clima"
      />
    </div>
    <hr />
    <div className="info-clima">
      <p>
        <strong>Temperatura:</strong> <strong>{temperatura}&deg;C</strong>
      </p>
      <p>
        <span>Mínima:</span> {minima}&deg;C / <span>Máxima:</span> {maxima}
        &deg;C
      </p>
      <p>
        <span>Humedad:</span> {humedad}%
      </p>
    </div>
  </article>
);

const App = () => {
  const [ciudad, setCiudad] = useState("Argentina");
  const [datos, setDatos] = useState(null);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${API_KEY}`;

  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch(URL);
      const datos = await respuesta.json();
      if (datos.cod >= 400) {
        setDatos(null);
      } else {
        setDatos(datos);
      }
    } catch (error) {
      console.error(error);
      setDatos(null);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, [ciudad]);

  const seleccionarIcono = (descripcion) => {
    switch (descripcion.toLowerCase()) {
      case "thunderstorm":
        return "thunderstorms.svg"; // trueno
      case "drizzle":
        return "drizzle.svg"; // llovizna
      case "rain":
        return "rain.svg"; // lluvia
      case "snow":
        return "snow.svg"; // nieve
      case "clear":
        return "clear.svg"; // despejado
      case "clouds":
        return "clouds.svg"; // nubes
      case "mist":
        return "mist.svg"; // niebla
      default:
        return "overcast.svg"; // nublado
    }
  };

  return (
    <div className="contenedor">
      <Encabezado cambiarCiudad={setCiudad} />
      <main>
        <BarraBusqueda buscarCiudad={setCiudad} />
        {datos ? (
          <TarjetaClima
            ciudad={datos.name}
            temperatura={datos.main.temp}
            minima={datos.main.temp_min}
            maxima={datos.main.temp_max}
            humedad={datos.main.humidity}
            icono={seleccionarIcono(datos.weather[0].main)}
          />
        ) : (
          <h2>No se encontró la ciudad...</h2>
        )}
      </main>
    </div>
  );
};
