const { useState, useEffect } = React;

const getIcon = (icon) => {
    const iconMap = {
        Thunderstorm: 'iconos/thunderstorms-rain.svg',
        Drizzle: 'iconos/drizzle.svg',
        Rain: 'iconos/rain.svg',
        Snow: 'iconos/snowy.svg',
        Clear: 'iconos/clear-day.svg',
        Atmosphere: 'iconos/weather.svg',
        Clouds: 'iconos/cloudy.svg',
        Fog: 'iconos/fog.svg',
        Haze: 'iconos/haze.svg',
        Smoke: 'iconos/smoke.svg',
        Mist:'iconos/mist.svg'
    };

    return iconMap[icon] || 'iconos/default-icon.svg';
};

const App = () => {
    const [search, setSearch] = useState('tucuman');
    const [values, setValues] = useState('');
    const [icon, setIcon] = useState('');

    const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${search},AR&lang=es&units=metric&appid=c89924c930c6330b069a71e50c7aeab1`;
    const getData = async () => {
        await fetch(API_KEY)
            .then(response => response.json())
            .then(data => {
                if (data.cod >= 400) {
                    setValues(false);
                } else {
                    setIcon(data.weather[0].main);
                    setValues(data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, [search]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearch(e.target.value);
        }
    };

    return (
        <>
            <div>
                <nav>
                    <ul>
                        <li className="Titulo"><strong>Clima</strong></li>
                    </ul>
                    <div className="Favoritos">
                        <ul>
                            <li><a href="#" onClick={() => setSearch('tucuman')}>Tucumán</a></li>
                            <li><a href="#" onClick={() => setSearch('salta')}>Salta</a></li>
                            <li><a href="#" onClick={() => setSearch('buenos aires')}>Buenos Aires</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="Buscador">
                    <input
                        onKeyDown={handleSearch}
                        type="text"
                        name="search"
                        placeholder="Buscar" 
                        aria-label="Search"
                    />
                </div>
            </div>
            <div className="Card">
                {values ? (
                    <div className="card-container">
                        <article>
                            <header><h1>{values.name}</h1></header>
                            <body>
                            <div className="icono-container">
                                <img className="icono" src={getIcon(icon)} alt="icon-weather" />
                            </div>
                            </body>
                            <footer>
                                <h1>Temperatura: {values.main.temp}&deg;</h1>
                                <p className="Temp-max-min">Mínima: {values.main.temp_min}&deg; / Máxima: {values.main.temp_max}&deg;</p>
                                <p className="Humedad">Humedad: {values.main.humidity}</p>
                            </footer>
                        </article>
                    </div>
                ) : (
                    <>
                        <div className="Msj">
                            <h1 className="No-Encontrado">{"Provincia no encontrada"}</h1> 
                            <p>Si no encuentra su provincia, Busque su Capital.</p>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
