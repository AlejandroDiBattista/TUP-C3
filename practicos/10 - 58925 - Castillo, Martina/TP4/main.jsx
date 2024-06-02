import React, { useState, useEffect } from 'react';

const API_KEY = 'b76cc060695cc26ce15771836164cc66';

function App() {
  const [search, setSearch] = useState('');
  const [values, setValues] = useState(null);
  const [icon, setIcon] = useState('');

  const getData = async (query) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=es&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (response.ok) {
        setValues(data);
        setIcon(data.weather[0].icon);
      } else {
        setValues(false);
      }
    } catch (error) {
      console.error('Error al obtener los datos', error);
      setValues(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  const clickProv = (prov) => {
    setSearch(prov);
  };

  useEffect(() => {
    if (search) {
      getData(search);
    }
  }, [search]);

  const Icons = (icon) => {
    switch (icon) {
      case "01d":
        return "icons/01d.svg";
      case "01n":
        return "icons/01n.svg";
      case "02d":
        return "icons/02d.svg";
      case "02n":
        return "icons/02n.svg";
      case "03d":
        return "icons/03d.svg";
      case "03n":
        return "icons/03n.svg";
      case "04d":
        return "icons/04d.svg";
      case "04n":
        return "icons/04n.svg";
      case "09d":
        return "icons/09d.svg";
      case "09n":
        return "icons/09n.svg";
      case "10d":
        return "icons/10d.svg";
      case "10n":
        return "icons/10n.svg";
      case "11d":
        return "icons/11d.svg";
      case "11n":
        return "icons/11n.svg";
      case "13d":
        return "icons/13d.svg";
      case "13n":
        return "icons/13n.svg";
      case "50d":
        return "icons/50d.svg";
      case "50n":
        return "icons/50n.svg";
      default:
        return "icons/clear-day.svg";
    }
  };

  return (
    <>
      <div className="contenedor">
        <nav>
          <h1>Clima</h1>
          <ul>
            <li><strong> </strong></li>
          </ul>
          <ul>
            <li><a href="#" onClick={() => clickProv("Tucuman")}>Tucumán</a></li>
            <li><a href="#" onClick={() => clickProv("Salta")}>Salta</a></li>
            <li><a href="#" onClick={() => clickProv("Buenos Aires")}>Buenos Aires</a></li>
          </ul>
        </nav>
        <div className="buscador">
          <input
            onKeyDown={handleSearch}
            type="search"
            name="Busca"
            placeholder="Buscar"
            aria-label="Buscar"
          />
        </div>
      </div>

      <div className="card">
        {values ? (
          values !== false ? (
            <article>
              <header><h2>{values.name}</h2></header>
              <img src={Icons(icon)} alt="Ícono del clima" />
              <footer>
                <div className="ContenedorCard">
                  <p className="temp">Temperatura: {values.main.temp.toFixed(0)}&deg;C</p>
                  <div className="footerC">
                    <p className="temp-max-min">Mínima {values.main.temp_min.toFixed(0)}&deg;C / Máxima {values.main.temp_max.toFixed(0)}&deg;C</p>
                    <p className="humedity">Humedad: {values.main.humidity.toFixed(0)}%</p>
                  </div>
                </div>
              </footer>
            </article>
          ) : (
            <h1>Ciudad no encontrada</h1>
          )
        ) : (
          <h1>Introduce una ciudad para buscar</h1>
        )}
      </div>
    </>
  );
}

export default App;
