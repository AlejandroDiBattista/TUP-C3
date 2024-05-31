const API_KEY = '81a83c03e20c96bae9bef8e8aea26573';

function App() {
   
    const [city, setCity] = useState('Barcelona');
    const [weather, setWeather] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    const fetchWeather = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        if (data.cod === 200) {
            setWeather({
                name: data.name,
                temp: data.main.temp,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                humidity: data.main.humidity,
                icon: getWeatherIcon(data.weather[0].icon)
            });
        } else {
            <h1>{"ciudad no encontrada"}</h1>
        }
    };

    const getWeatherIcon = (iconCode) => {
        const iconMapping = {
            '01d': 'icons/clear-day.svg',
            '01n': 'icons/clear-night.svg',
            '02d': 'icons/partly-cloudy-day.svg',
            '02n': 'icons/partly-cloudy-night.svg',
            '03d': 'icons/cloudy.svg',
            '03n': 'icons/cloudy.svg',
            '04d': 'icons/overcast.svg',
            '04n': 'icons/overcast.svg',
            '09d': 'icons/showers-day.svg',
            '09n': 'icons/showers-night.svg',
            '10d': 'icons/rain-day.svg',
            '10n': 'icons/rain-night.svg',
            '11d': 'icons/thunderstorms-day.svg',
            '11n': 'icons/thunderstorms-night.svg',
            '13d': 'icons/snow.svg',
            '13n': 'icons/snow.svg',
            '50d': 'icons/fog.svg',
            '50n': 'icons/fog.svg',
            'unknown': 'icons/unknown.svg' 
        };
        return iconMapping[iconCode] || iconMapping['unknown'];
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setSearchTimeout(setTimeout(() => setCity(value), 500));
    };

    return (
        <>
    <nav>
  
    <ul>
    <h1><strong>Clima</strong></h1>
    </ul>
        <ul>
            <li><a href="#" onClick={() => setCity('Tucuman')}>Tucuman</a></li>
            <li><a href="#" onClick={() => setCity('Salta')}>Salta</a></li>
            <li><a href="#" onClick={() => setCity('Buenos Aires')}>Buenos Aires</a></li>
        </ul>
    </nav>
    
        <input type="search" value={searchTerm} onChange={handleSearchChange} placeholder="Search"/>
        
        {weather && (
        <article>
            <header><strong>{weather.name}</strong></header>
               <img src={weather.icon} />
            <footer>
                <p><strong>Temperatura: {weather.temp.toFixed(2)}°C</strong></p>
                <p>Minima: {weather.temp_min.toFixed(2)}°C / Maxima: {weather.temp_max.toFixed(2)}°C</p>
                <p>Humedad: {weather.humidity}</p>
            </footer>
        </article>)}
        </>)}

     