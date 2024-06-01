const { useState, useEffect } = React;

const API_KEY = '30d38b26954359266708f92e1317dac0';

const App = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");

    const tucuman = 'Tucumán';
    const salta = 'Salta';
    const buenosAires = 'Buenos Aires';

    const loadWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    useEffect(() => {
        if (city) {
            loadWeatherData(city);
        }
    }, [city]);

    const onCityClick = (city) => {
        setCity(city);
    };

    const onInputChange = (event) => {
        setSearch(event.target.value);
    };

    const onSearch = () => {
        setCity(search);
        setSearch("");
    };

    const onEnterKey = (event) => {
        if (event.key === "Enter") {
            onSearch();
        }
    };

    return (
        <>
            <nav>
                <ul>
                    <li><strong className="TITULO">Clima</strong></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => onCityClick(tucuman)}>Tucumán</a></li>
                    <li><a href="#" onClick={() => onCityClick(salta)}>Salta</a></li>
                    <li><a href="#" onClick={() => onCityClick(buenosAires)}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                type="search"
                placeholder="Ingrese la ciudad"
                value={search}
                onChange={onInputChange}
                onKeyDown={onEnterKey}
            />
            <div>
                {weather && (
                    <div className="weather-container">
                        <h3>{weather.name}</h3>
                        <img src={`./openweathermap/${weather.weather[0].icon}.svg`} alt="weather icon" />
                        <p className="temperature">Temperatura: {weather.main.temp}°C</p>
                        <p>Minima: {weather.main.temp_min}°C / Maxima: {weather.main.temp_max}°C</p>
                        <p>Humedad: {weather.main.humidity}%</p>
                    </div>
                )}
            </div>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 