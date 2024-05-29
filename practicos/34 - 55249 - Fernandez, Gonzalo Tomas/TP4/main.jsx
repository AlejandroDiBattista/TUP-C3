// main.jsx

// const API_KEY = '30d38b26954359266708f92e1317dac0'
const API_KEY = '21368a521acea6a154fa89c701151149';

// Mapeo de Ciudades
// Argentina
const argentinaCities = [
  { name: "Buenos Aires", lat: -34.61, lon: -58.38 },
  { name: "Buenos Aires Capital Federal", lat: -34.61, lon: -58.38 },
  { name: "Catamarca", lat: -28.47, lon: -65.79 },
  { name: "Chaco", lat: -26.33, lon: -60.44 },
  { name: "Chubut", lat: -43.3, lon: -65.1 },
  { name: "Córdoba", lat: -31.41, lon: -64.18 },
  { name: "Corrientes", lat: -27.48, lon: -58.83 },
  { name: "Entre Ríos", lat: -32.06, lon: -59.8 },
  { name: "Formosa", lat: -26.19, lon: -58.23 },
  { name: "Jujuy", lat: -24.19, lon: -65.31 },
  { name: "La Pampa", lat: -36.62, lon: -64.29 },
  { name: "La Rioja", lat: -29.41, lon: -66.86 },
  { name: "Mendoza", lat: -32.89, lon: -68.84 },
  { name: "Misiones", lat: -27.36, lon: -55.9 },
  { name: "Neuquen", lat: -38.95, lon: -68.06 },
  { name: "Río Negro", lat: -40.81, lon: -63 },
  { name: "Salta", lat: -24.79, lon: -65.41 },
  { name: "San Juan", lat: -31.54, lon: -68.52 },
  { name: "San Luís", lat: -33.3, lon: -66.34 },
  { name: "Santa Cruz", lat: -51.62, lon: -69.22 },
  { name: "Santa Fe", lat: -31.63, lon: -60.7 },
  { name: "Santiago del Estero", lat: -27.8, lon: -64.26 },
  { name: "Tierra del Fuego - Antártida e Islas del Atlántico Sur", lat: -54.81, lon: -68.31 },
  { name: "Tucuman", lat: -26.83, lon: -65.22 }
];

// España
const spainCities = [
  { name: "Barcelona", lat: 41.39, lon: 2.16 },
  { name: "Madrid", lat: 40.42, lon: -3.70 },
  { name: "Valencia", lat: 39.47, lon: -0.38 },
  { name: "Sevilla", lat: 37.39, lon: -5.99 },
  { name: "Zaragoza", lat: 41.65, lon: -0.88 },
  { name: "Málaga", lat: 36.72, lon: -4.42 },
  { name: "Murcia", lat: 37.98, lon: -1.13 },
  { name: "Palma de Mallorca", lat: 39.57, lon: 2.65 },
  { name: "Las Palmas", lat: 28.13, lon: -15.43 },
  { name: "Bilbao (Vizcaya)", lat: 43.26, lon: -2.93 },
  { name: "Alicante", lat: 38.35, lon: -0.48 },
  { name: "Córdoba", lat: 37.88, lon: -4.78 },
  { name: "Valladolid", lat: 41.65, lon: -4.72 },
  { name: "Vigo (Pontevedra)", lat: 42.24, lon: -8.72 },
  { name: "Gijón (Asturias)", lat: 43.54, lon: -5.66 },
  { name: "A Coruña", lat: 43.37, lon: -8.40 },
  { name: "Granada", lat: 37.18, lon: -3.60 },
  { name: "Oviedo (Asturias)", lat: 43.36, lon: -5.85 },
  { name: "Santa Cruz de Tenerife", lat: 28.47, lon: -16.25 },
  { name: "Santander (Cantabria)", lat: 43.46, lon: -3.80 },
  { name: "Badajoz", lat: 38.88, lon: -6.97 },
  { name: "Toledo", lat: 39.86, lon: -4.02 },
  { name: "Salamanca", lat: 40.96, lon: -5.66 }
];

function App() {
  const [city, setCity] = useState('Barcelona');
  const [weatherData, setWeatherData] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);

  const allCities = [...argentinaCities, ...spainCities];

  useEffect(() => {
    const cityData = allCities.find(c => c.name.toLowerCase() === city.toLowerCase());
    if (cityData) {
      fetchWeather(cityData.lat, cityData.lon);
    }
  }, [city]);

  const handleCityChange = (e) => {
    const searchTerm = e.target.value;
    setCity(searchTerm);
    setSearchTerm(searchTerm);
  };

  const handleNavClick = (name) => {
    const cityData = allCities.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (cityData) {
      setCity(name);
      fetchWeather(cityData.lat, cityData.lon);
    }
  };

  const fetchWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <nav>
          <h2>Clima</h2>
        <ul>
          <li onClick={() => handleNavClick('Tucuman')}><a href="#">Tucuman</a></li>
          <li onClick={() => handleNavClick('Salta')}><a href="#">Salta</a></li>
          <li onClick={() => handleNavClick('Buenos Aires')}><a href="#">Buenos Aires</a></li>
        </ul>
      </nav>
      <input
        type="search"
        name="search"
        placeholder="Buscar ciudad..."
        aria-label="Search"
        value={city}
        onChange={handleCityChange}
      />
      {weatherData && <Weather data={weatherData} />}
      <p className="footer-text">@Gonzalo Tomas Fernandez</p>
    </>
  );
}