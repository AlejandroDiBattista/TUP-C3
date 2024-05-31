const API_KEY = '30d38b26954359266708f92e1317dac0';

const cities = ["Tucuman", "Salta", "Buenos Aires"];

function App() {
    const [city, setCity] = React.useState('');
    const [weather, setWeather] = React.useState(null);

    const fetchWeather = async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    const handleCityClick = (cityName) => {
        fetchWeather(cityName);
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>Clima</h1>
                <nav className="city-buttons">
                    {cities.map((cityName) => (
                        <button key={cityName} onClick={() => handleCityClick(cityName)}>
                            {cityName}
                        </button>
                    ))}
                </nav>
            </header>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(e);
                        }
                    }}
                    placeholder="Buscar ciudad"
                    className="search-input"
                />
            </form>
            <div className="container">
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.name}</h2>
                        <div className="weather-icon">
                            <img
                                src={`./openweathermap/${weather.weather[0].icon}.svg`}
                                alt={weather.weather[0].description}
                            />
                           
                        </div>
                        <div className="weather-details">
                            <div className="temperature">
                                <p><strong>Temperatura: {weather.main.temp}°C</strong></p>
                                <p>Minima: {weather.main.temp_min}°C</p>
                                <p>Maxima: {weather.main.temp_max}°C</p>
                            </div>
                            <div className="humidity">
                                <p>Humedad: {weather.main.humidity}%</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);