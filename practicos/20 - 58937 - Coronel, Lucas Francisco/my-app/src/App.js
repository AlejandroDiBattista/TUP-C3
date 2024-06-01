import React, { useEffect, useState } from 'react';
import './App.css';
import Iconos from './componentes/iconos';

function App() {
  const [search, setSearch] = useState('buenos aires');
  const [values, setValues] = useState(null);
  const [iconos, setIconos] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();

      if (data.cod >= 400) {
        setValues(false);
        setIconos(null);
      } else {
        setValues(data);
        setIconos(data.weather[0].main);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita que el formulario se envíe
      setSearch(e.target.value);
    }
  };

  const clickProv = (ciudad) => {
    setSearch(ciudad);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [search]);

  return (
    <div className="container">
      <nav>
        <ul>
          <li><strong>Ciudades</strong></li>
        </ul>
        <ul>
          <li><a href="#" onClick={() => clickProv("Tucuman")}>Tucumán</a></li>
          <li><a href="#" onClick={() => clickProv("Salta")}>Salta</a></li>
          <li><a href="#" onClick={() => clickProv("Buenos Aires")}>Buenos Aires</a></li>
        </ul>
      </nav>

      <header className="header">
        <h1>Clima</h1>
      </header>

      <main>
        <form role="search">
          <input
            name="search"
            type="search"
            placeholder="Buscar"
            onKeyDown={handleSearch}
            autoFocus
          />
        </form>
        <div className="card">
          {values ? (
            <div className="card-container">
              <h1 className="city-name">{values.name}</h1>
              <p className="temp">{values.main.temp.toFixed(0)}&deg;C</p>
              {iconos && <img className="icono" src={Iconos(iconos)} alt="icon-weather" />}
              <div className="footer-card">
                <p className="temp-max-min">
                  Mínima: {values.main.temp_min.toFixed(0)}&deg;C | Máxima: {values.main.temp_max.toFixed(0)}&deg;C
                </p>
                <p className="humidity">Humedad: {values.main.humidity.toFixed(0)}%</p>
              </div>
            </div>
          ) : (
            <h1>{'Ciudad no encontrada'}</h1>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
