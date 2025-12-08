const API_KEY = '30d38b26954359266708f92e1317dac0'
const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [ciudadSelec, setCiudadSelec] = useState("");
    const [buscarInput, setBuscarInput] = useState("");

    const cities = {
        tucuman: 'Tucumán',
        salta: 'Salta',
        bs: 'Buenos Aires',
    };

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }
    };

    useEffect(() => {
        fetchWeatherData(ciudadSelec);
    }, [ciudadSelec]);

    const handleCityClick = (city) => {
        setCiudadSelec(city);
    };

    const handleSearchInputChange = (event) => {
        setBuscarInput(event.target.value);
    };

    const handleSearch = () => {
        setCiudadSelec(buscarInput);
        fetchWeatherData(buscarInput);
        setBuscarInput("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    
    return <>
        <nav>
            <ul>
                <li className="li-clima"><strong>Clima</strong></li>
            </ul>
            <ul>
                <li><a href="#" onClick={() => handleCityClick(cities.tucuman)}>Tucumán</a></li>
                <li><a href="#" onClick={() => handleCityClick(cities.salta)}>Salta</a></li>
                <li><a href="#" onClick={() => handleCityClick(cities.bs)}>Buenos Aires</a></li>
            </ul>
        </nav>
        <input
            type="search"
            name="search"
            placeholder="Search"
            aria-label="Search"
            value={buscarInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
        />
        <article>
            {weatherData && (
                <div>
                    <p className="p-nombre">{weatherData.name + ", " + weatherData.sys.country}</p>
                    <div className="icono">
                        <img src={`./openweathermap/${weatherData.weather[0].icon}.svg`} alt="weather icon" />
                    </div>
                    <p className="p-temperatura">Temperatura: {weatherData.main.temp}°C</p>
                    <p className="p-min-max">Mínima: {weatherData.main.temp_min}°C / Máxima: {weatherData.main.temp_max}°C</p>
                    <p className="p-humedad">Humedad: {weatherData.main.humidity}%</p>
                </div>
            )}
        </article>
    </>
}