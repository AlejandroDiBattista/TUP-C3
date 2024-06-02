const { useState, useEffect } = React;
const API_KEY = "30d38b26954359266708f92e1317dac0"; //API clave 2


function App() {

  const [clima, setClimas] = useState(null);
  const [ElegirCiudades, setElegirCiudades] = useState("Tucuman");
  const iconoUrl = clima ? `./iconos/${clima.weather[0].icon}.svg` : " ";
  const [buscarInput, setBuscarInput] = useState(" ");

  const fetchClima = async (ciudad) => {
    const respuesta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric`
    );
    const datos = await respuesta.json();
    setClimas(datos); // unir con la otra
  };

  useEffect(() => {
    fetchClima(ElegirCiudades);
  }, []);

  //Base - Tuc
  const ciudadesClick = async (ciudad) => {
    setElegirCiudades(ciudad);
    await fetchClima(ciudad);
  };

  const cambioBuscar = (evento) => {
    setBuscarInput(evento.target.value);
  };
  const apretarEnter = (evento) => {
    if (evento.key === "Enter") {
      manejarBuscar();
    }
  };

  const manejarBuscar = async () => {
    setElegirCiudades(buscarInput);
    await fetchClima(buscarInput);
    setBuscarInput("");
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
              onClick={() => ciudadesClick("Tucumán")} > Tucumán
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ciudad"
              onClick={() => ciudadesClick("Salta")} > Salta
            </a>
          </li>
          <li>
            <a
              href="#"
              className="ciudad"
              onClick={() => ciudadesClick("Buenos Aires")} > Buenos Aires
            </a>
          </li>
        </ul>
      </nav>

      <input
  className="buscar" // func. buscar - boton (declarada igual)
  type="search" 
  placeholder="Buscar"
  aria-label="Buscar"
  value={buscarInput}
  onChange={cambioBuscar}
  onKeyDown={apretarEnter}
    /> 



      <main>
        {ElegirCiudades && clima && (
          <>
            <article className="contenedor">

              <header>
                <h2>{ElegirCiudades}</h2>
              </header>

              <div className="iconos">
                <img src={iconoUrl} alt="Icono del Clima actual" />
              </div>

              <footer>
                <h2>Temperatura: {clima.main.temp} C°</h2>
                <p>
                  Mínima: {clima.main.temp_min} C°/ Máxima: {clima.main.temp_max} C°
                </p>
                <p>Humedad %: {clima.main.humidity}</p>
              </footer>

            </article>
          </>
        )}
      </main>
    </>

  );
}

//End