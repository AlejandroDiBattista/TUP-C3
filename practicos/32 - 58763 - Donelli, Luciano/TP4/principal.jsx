const { useState, useEffect } = React;
const apiKey = '1b36b41f54ea7027186a98601b132ccd';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const cities = ['Tucumán', 'Salta', 'Buenos Aires'];

    const fetchWeather = async (cityName) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();
        setWeatherData(data);
    };

    useEffect(() => {
        // Ciudad de por defecto
        fetchWeather('Tucumán');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div>
            <div className="cabecera">
                <h1>Clima</h1>
                <div>
                    {cities.map((cityName) => (
                        <button key={cityName} onClick={() => fetchWeather(cityName)}>
                            {cityName}
                        </button>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad"
                    aria-label="Search"
                />
            </form>
            {weatherData && (
                <div className="panelClima">
                    <h2>{weatherData.name}</h2>
                    <div className="icono">
                        <div className="icono-fondo">
                        <img src={`./iconos/${weatherData.weather[0].icon}.svg`} alt="weather icon" />
                        </div>
                    </div>
                    <h1>Temp: {weatherData.main.temp.toFixed(1)} °C</h1>
                    <p>Mínima: {weatherData.main.temp_min.toFixed(1)} °C / Máxima: {weatherData.main.temp_max.toFixed(1)} °C</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<WeatherApp />, document.getElementById('root'));
