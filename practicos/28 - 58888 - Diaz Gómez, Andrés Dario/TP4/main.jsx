const {useState,useEffect} = React
const API_KEY = '30d38b26954359266708f92e1317dac0'


function App() {
    const [search,setSearch] = useState('tucuman')
    const [values,setValues] = useState ('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${API_KEY}`
    const obtenerDatos = async () => {
        await fetch(url)
        .then(response => {return response.json()})
        .then(data =>{
            if(data.cod >=400) {
                setValues(false)
            }else{
                console.log(data)
                console.log(data.weather[0].main)
                setValues(data)
            }
            console.log(data.name)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    const handleClick = (e) =>{
        console.log(e.target.textContent)
        const ciudad = e.target.textContent
        setSearch(ciudad)
    }
    const handleSearch = (e) => {
        if(e.key === 'Enter'){
            console.log(e.target.value)
            setSearch(e.target.value)
        }
    }
    
    useEffect(()=>{
        obtenerDatos()
    },[search])
    return <>
        <nav>
            <ul>
                <li><strong>Clima</strong></li>
            </ul>
            <ul>
                <li><a onClick={handleClick}>Tucuman</a></li>
                <li><a onClick={handleClick}>Salta</a></li>
                <li><a onClick={handleClick}>Buenos Aires</a></li>
            </ul>
        </nav>
        <form role="search" onSubmit={e => {e.preventDefault()}}>
            <input name="search" type="text" autoFocus placeholder="Buscar" onKeyDown={handleSearch}/>
        </form>
        <div className="card">
            {(values) ? (
                <article>
                    <h1 className="city-name">{values.name}</h1>
                    <p className="temp">{values.main.temp.toFixed(0)}&deg;</p>
                    <img className="icon" src={"../openweathermap/"+values.weather[0].icon+".svg"} alt="icon-weather" />
                    <p className="temp-max-min">{values.main.temp_min.toFixed(0)}&deg; | {values.main.temp_max.toFixed(0)}&deg;</p>
                </article>
            ) : (
                <h1>{"Ciudad no encontrada"}</h1>
            )

            }

        </div>

    </>
}