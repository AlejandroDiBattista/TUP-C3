const API_KEY = "432933b8339f80cc687064a4db3600c0"

function App() {

    const [buscar, setBuscar] = useState("Argentina")
    const [values, setValues] = useState("")
    const [icon, setIcon] = useState("")

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${buscar}&lang=es&units=metric&appid=${API_KEY}`

    const getData = async() => {

        await fetch(URL)
        .then(response =>{return response.json()})
        .then(data => {
            if(data.cod >= 400){
                setValues(false)
            } else{
                console.log(data)
                console.log(data.weather[0].main)
                setIcon(data.weather[0].main)
                setValues(data)
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const manejarBuscar = (e) => {
        if(e.key === "Enter"){
            console.log(e.target.value)
            setBuscar(e.target.value)
        }
    }

    const clicEnCiudad = (ciudad) => {
        setBuscar(ciudad)
    }

    useEffect(()=>{
        getData()
    }, [buscar])

    const Icons = (icon) => {
        switch(icon) {
            case "Thunderstorm":
            return "icons/thunderstorms-rain.svg";
            
            case "Drizzle":
            return "icons/drizzle.svg"

            case "Rain":
            return "icons/rain.svg"

            case "Snow":
            return "icons/snow.svg"

            case "Clear":
            return "icons/clear-day.svg"

            case "Atmosphere":
            return "icons/weather.svg"

            case "Clouds":
            return "icons/fog.svg"

            case "Fog":
            return "icons/fog.svg"

            case "Haze":
            return "icons/haze.svg"

            case "Smoke":
            return "icons/smoke.svg"

        default: "icons/clear-day.svg"
    }
        return icon
    }

    return(
    <>
        <nav>
            <ul><h1><strong>Clima</strong></h1></ul>
            <ul>
                <li><a href="#" onClick={()=>clicEnCiudad("Tucuman")}>Tucuman</a></li>
                <li><a href="#" onClick={()=>clicEnCiudad("Salta")}>Salta</a></li>
                <li><a href="#" onClick={()=>clicEnCiudad("Buenos Aires")}>Buenos Aires</a></li>
            </ul>
        </nav>

            <input onKeyDown={manejarBuscar} type="search" placeholder="Buscar" autoFocus/>

            {(values) ? (
            <article>
                <header><h2>{values.name}</h2></header>
                    <img src={Icons(icon)}/>
                <footer>
                    <h3><strong>Temperatura: {values.main.temp.toFixed(0)}°C</strong></h3>
                    <p>Minima: {values.main.temp_min.toFixed(0)}°C /
                        Maxima: {values.main.temp_max.toFixed(0)}°C<br/>
                        Humedad: {values.main.humidity.toFixed(0)}</p>
                </footer>
            </article>
            ) : (
                <h1>{"Ciudad no encontrada"}</h1>
            )}
    </>)
    }
