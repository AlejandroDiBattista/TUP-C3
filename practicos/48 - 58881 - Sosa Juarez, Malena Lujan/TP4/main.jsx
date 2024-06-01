
const API_KEY = '30d38b26954359266708f92e1317dac0'
function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState("");
    const [searchInput, setSearchInput] = useState("");

    function cities() {
        return {
            tucuman: 'Tucumán',
            salta: 'Salta',
            buenosaires: 'Buenos Aires',
        };
    }
    async function fetchWeatherData(city) {
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
    }
    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);
    function handleCityClick(city) {
        setSelectedCity(city);
    }
    function handleSearchInputChange(event) {
        setSearchInput(event.target.value);
    }
    function handleSearch() {
        setSelectedCity(searchInput);
        setSearchInput("");
    }
    function handleKeyDown(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }
    return (
        <>
            <nav>
                <ul className="TITULO">
                    <li><strong>Clima</strong></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={() => handleCityClick(cities().tucuman)}>Tucumán</a></li>
                    <li><a href="#" onClick={() => handleCityClick(cities().salta)}>Salta</a></li>
                    <li><a href="#" onClick={() => handleCityClick(cities().buenosaires)}>Buenos Aires</a></li>
                </ul>
            </nav>
            <input
                type="search"
                placeholder="Buscar"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyDown}
            />
            <article>
                {weatherData && (
                    <div>
                        <h2>{weatherData.name}</h2>
                        <hr />
                        <img id="imagen" src={`./openweathermap/${weatherData.weather[0].icon}.svg`} />
                        <hr />
                        <h3>Temperatura: {weatherData.main.temp}°C</h3>
                        <p>Minima: {weatherData.main.temp_min}°C / Maxima: {weatherData.main.temp_max}°C</p>
                        <p>Humedad: {weatherData.main.humidity}%</p>
                        
                    </div>
                )}
            </article>
        </>
    );
}
