const { useState, useEffect } = require("react")

const API_KEY = '30d38b26954359266708f92e1317dac0'
function App() {
    const [search, setSearch] = useState('')
    const [values, setValues] = useState('')
    const [icon, setIcon] = useState('')

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=30d38b26954359266708f92e1317dac0`;
    
    

    const getData = async () => {
        await fetch(URL)
        .then(Response => {return Response.json()})
        .then( data => {
            if(data >= 400) {
                setValues(false)
            }else {
                console.log(data)
                console.log(data.weather[0].main)
                setIcon(data.weather[0].main)
                setValues(data)
            }
           // console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }
    const handleSearch = (e) => {
        if(e.key === 'Enter') {
           // console.log(e.targrt.value)
            setSearch(e.target.value)
        }
    }

    const clickEnProvincia = (provincia) =>{
        setSearch(provincia)
    }
    
    useEffect(() => {
        getData()
    },[search]) //eslint-disable-line React.hooks/exhaustive-deps
    const iconos = (icon) => {
        switch(icon) {
            case"clear-day":
            return"iconos/clear-day.svg"

            case "01d":
            return "iconos/01d.svg";

            case "01n":
            return "iconos/01n.svg"

            case "02d":
            return "iconos/02d.svg"

            case "02n":
            return "iconos/02n.svg"

            case "03d":
            return "iconos/03d.svg"

            case "03n":
            return "iconos/03n.svg"

            case "04d":
            return "iconos/04d.svg"

            case "04n":
            return "iconos/04n.svg"
            
            case "09d":
            return "iconos/09d.svg"

            case "09n":
            return "iconos/09n.svg"

            case "10d":
            return "iconos/10d.svg"
            
            case "10n":
            return "iconos/10n.svg"

            case "11d":
            return "iconos/11d.svg"

            case "11n":
            return "iconos/11n.svg"

            case "13d":
            return "iconos/13d.svg"

            case "13n":
            return "iconos/13n.svg"

            case "50d":
            return "iconos/50d.svg"

            case "50n":
            return "iconos/50n.svg"

        default:"iconos/50n.svg"
        
    }
        return icon
    }
    
    return(
     <>
        <div>
        
            <nav>
                <h1>Clima</h1>
                <ul>
                    <li><strong> </strong></li>
                </ul>
                <ul>
                    <li><a href="#" onClick={()=>clickEnProvincia("Tucuman")}>Tucumán</a></li>
                    <li><a href="#" onClick={()=>clickEnProvincia("Salta")}>Salta</a></li>
                    <li><a href="#" onClick={()=>clickEnProvincia("Buenos Aires")}>Buenos Aires</a></li>
                </ul>
            </nav>
        <div>
            <input
                onKeyDown={handleSearch}
                type="Search"
                name="Search"
                placeholder="Buscar"
                aria-label="Search"
            />
        </div>
        </div>
      
        <div className="card">
            {(values) ? (
                <article>
                <header>
                    <h2>{values.name}</h2>
                </header>
                <img src={iconos(icon)}/>

                <footer>
                    <div className="Card-Container">
                    <p className="temp"><b>Temperatura: {values.main.temp.toFixed(0)}&deg;C</b></p>

                    <div className="card-footer">
                    <p className="temp-max-min">Mínima: {values.main.temp_min.toFixed(0)}&deg;C / Máxima: {values.main.temp_max.toFixed(0)}&deg;C</p>
                    <p className="humedity">Humedad: {values.main.humidity.toFixed(0)}%</p>
                    </div>
                    </div>
              </footer>
              </article>
            ):(
                <h1>{"Ciudad no encontrada"}</h1>
            )

            }
        </div> 
    </>
    );
}