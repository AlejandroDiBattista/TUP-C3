const { useState, useEffect } = React;

function App() {
    const [ciudad, setCiudad] = useState('Buenos Aires');
    const [datosClima, setDatosClima] = useState(null);

    const ciudadesPredefinidas = ['Tucuman', 'Salta', 'Buenos Aires'];

    const obtenerClima = async (nombreCiudad) => {
        const apiKey = '50aeb60677b651a5786f10971f095a8c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${apiKey}&units=metric&lang=es`;

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            if (datos.cod !== 200) {
                throw new Error(datos.message);
            }
            setDatosClima(datos);
        } catch (error) {
            console.error('Error obteniendo los datos', error);
        }
    };

    useEffect(() => {
        if (ciudad) {
            obtenerClima(ciudad);
        }
    }, [ciudad]);

    const manejarBusqueda = (event) => {
        event.preventDefault();
        const nombreCiudad = event.target.elements.search.value.trim();
        setCiudad(nombreCiudad);
    };

    const obtenerIconoClima = (codigoIcono) => {
        return `./openweathermap/${codigoIcono}.svg`;
    };

    return (
        <div>
            <header>
                <h1>Clima</h1>
                <nav>
                    {ciudadesPredefinidas.map((nombreCiudad) => (
                        <a key={nombreCiudad} href="#" onClick={() => setCiudad(nombreCiudad)}>
                            {nombreCiudad}
                        </a>
                    ))}
                </nav>
            </header>
            <main>
                <form onSubmit={manejarBusqueda}>
                    <input
                        type="search"
                        name="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                    />
                </form>
                {datosClima && (
                    <div id="weatherContainer">
                        <h2>{datosClima.name}</h2>
                        <img
                            id="weatherIcon"
                            src={obtenerIconoClima(datosClima.weather[0].icon)}
                            alt="Icono del clima"
                        />
                        <p><strong>Temperatura: {datosClima.main.temp}°C</strong></p>
                        <p>Temperatura mínima: {datosClima.main.temp_min}°C / Temperatura máxima: {datosClima.main.temp_max}°C</p>
                        <p>Humedad: {datosClima.main.humidity}%</p>
                    </div>
                )}
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
