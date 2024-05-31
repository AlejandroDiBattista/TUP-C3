const API_KEY = '30d38b26954359266708f92e1317dac0';
const { useState, useEffect } = React;

function App() {
    const [ciudad, setCiudad] = useState('')
    const [climaData, setClimaData] = useState(null)
    const [error, setError] = useState('')

    const ciudades = ['Tucuman', 'Salta', 'Buenos Aires']

    useEffect(() => {
        fetchWeather('Tucuman')
    }, [])

    const fetchWeather = async (ciudad) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada')
            }
            const data = await response.json()
            setClimaData(data);
            setError('')
        } catch (error) {
            setError(error.message)
        }
    };

    const Buscar = (e) => {
        e.preventDefault()
        if (ciudad) {
            fetchWeather(ciudad)
        }
    }

    const TenerIconos = (icon) => {
        const iconMap = {
            '01d': '01d', // Día soleado
            '01n': '01n', // Noche despejada
            '02d': '02d', // Día parcialmente nublado
            '02n': '02n', // Noche parcialmente nublada
            '03d': '03d', // Nublado
            '03n': '03n', // Nublado (noche)
            '04d': '04d', // Nubes rotas
            '04n': '04n', // Nubes rotas (noche)
            '09d': '09d', // Lluvia de chubascos
            '09n': '09n', // Lluvia de chubascos (noche)
            '10d': '10d', // Lluvia
            '10n': '10n', // Lluvia (noche)
            '11d': '11d', // Tormenta
            '11n': '11n', // Tormenta (noche)
            '13d': '13d', // Nieve
            '13n': '13n', // Nieve (noche)
            '50d': '50d', // Neblina
            '50n': '50n', // Neblina (noche)
        }

        const iconName = iconMap[icon];
        if (!iconName) {
            return null;
        }
        const Icono = `/imagenes/${iconName}.svg`;
         
        return Icono;
    }

    return (
        <div className="container">
            <header>
                <h1> Clima</h1>
                <nav>
                    <ul>
                        {ciudades.map((ciudad) => (
                            <li key={ciudad}>
                                <a href="#" onClick={() => fetchWeather(ciudad)}>{ciudad}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
            <main>
                <form onSubmit={Buscar} className="form">
                    <label htmlFor="city">Buscar ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        required
                    />
                    <button type="submit">Buscar</button>
                </form>
                <div id="weather-info">
                    {error && <p className="error">{error}</p>}
                    {climaData && (
                        <div className="weather-card">
                            <h2>{climaData.name}</h2>
                            <p className="icon">
                                {climaData.weather[0].icon && (
                                    <img src={TenerIconos(climaData.weather[0].icon)} alt="Icono del clima" />
                                )}
                            </p>
                            <p>Temperatura: {climaData.main.temp} °C</p>
                            <p>Temp. Mínima: {climaData.main.temp_min} °C</p>
                            <p>Temp. Máxima: {climaData.main.temp_max} °C</p>
                            <p>Humedad: {climaData.main.humidity} %</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
