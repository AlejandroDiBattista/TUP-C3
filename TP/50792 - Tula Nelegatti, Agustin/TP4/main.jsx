const { useState, useEffect } = require("react")

const API_KEY = 'a4b3381d4c5cf0590450a23d7e852ac7'

function App() {
    const [search, setSearch] = useState('')
    const [values, setValues] = useState('')
    const [icon, setIcon] = useState('')

    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=a4b3381d4c5cf0590450a23d7e852ac7' ;
    

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
    const Icons = (icon) => {
        switch(icon) {
            case "01d":
            return "icons/01d.svg"

            case "01n":
            return "icons/01n.svg"

            case "02d":
            return "icons/02d.svg"

            case "02n":
            return "icons/02n.svg"

            case "03d":
            return "icons/03d.svg"

            case "03n":
            return "icons/03n.svg"

            case "04d":
            return "icons/04d.svg"

            case "04n":
            return "icons/04n.svg"
            
            case "09d":
            return "icons/09d.svg"

            case "09n":
            return "icons/09n.svg"

            case "10d":
            return "icons/10d.svg"
            
            case "10n":
            return "icons/10n.svg"

            case "11d":
            return "icons/11d.svg"

            case "11n":
            return "icons/11n.svg"

            case "13d":
            return "icons/13d.svg"

            case "13n":
            return "icons/13n.svg"

            case "50d":
            return "icons/50d.svg"

            case "50n":
            return "icons/50n.svg"

        default: "icons/clear-day.svg"
    }
        return icon
    }
    
    return(
     <>
        <div className="contenedor">
        
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
        <div className="buscador">
            <input
                onKeyDown={handleSearch}
                type="search"
                name="Busca"
                placeholder="Buscar"
                aria-label="Search"
            />
        </div>
        </div>
    
        
        <div className="card">

            {(values) ? (
                <article>
                <header><h2>{values.name}</h2></header>
                <img src={Icons(icon)}></img>

                <footer>
                    <div className="Card-Container">
                <p className="temp">Temperatura: {values.main.temp.toFixed(0)}&deg;C</p>
               
               <div className="card-footer">
                <p className="temp-max-min">Mínima{values.main.temp_min.toFixed(0)}&deg;C / Máxima{values.main.temp_max.toFixed(0)}&deg;C</p>
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