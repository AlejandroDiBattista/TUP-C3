const API_KEY = 'acf164fb8033204e9eae907c95791d4c'

const ciudadesArgentinas = [
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
    { name: "Tierra del Fuego", lat: -54.81, lon: -68.31 },
    { name: "Tucuman", lat: -26.83, lon: -65.22 }
]

function App() {
    const [ciudad, setCiudad] = useState('Argentina')
    const [weatherData, setWeatherData] = useState(null);
    const [searchTerm, setSearchTerm] = useState([]);

    const todasLasCiudades = [...ciudadesArgentinas];

    useEffect(() => {
        const ciudadEncontrada = todasLasCiudades.find(c => c.name.toLowerCase() === ciudad.toLowerCase());
        if (ciudadEncontrada) {
            fetchWeather(ciudadEncontrada.lat, ciudadEncontrada.lon); // Busca en un API externa de metereologia (OpenWeather)

        }
    }, [ciudad]);

    const handlerCambioDeCiudad = (e) => {
        const searchTerm = e.target.value;
        setCiudad(searchTerm);
        setSearchTerm(searchTerm);
    }

    const handleNavClick = (name) => {
        const ciudadEncontrada = todasLasCiudades.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (ciudadEncontrada) {
            setCiudad(name);
            fetchWeather(ciudadEncontrada.lat, ciudadEncontrada.lon);
        }
    };

    const fetchWeather = (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error: ', error));
    };

    return <>
        <nav>
            <h1>Clima</h1>
            <ul>
                <li onClick={() => handleNavClick('Buenos Aires')}><a href="#">Buenos Aires</a></li>
                <li onClick={() => handleNavClick('Salta')}><a href="#">Salta</a></li>
                <li onClick={() => handleNavClick('Tucuman')}><a href="#">Tucuman</a></li>
            </ul>
        </nav>
        <input type="search" name="search" placeholder="Indica la ciudad..." aria-label="Search" value={ciudad} onChange={handlerCambioDeCiudad}/>
        {weatherData && <Weather data={weatherData} />}
    </>
}