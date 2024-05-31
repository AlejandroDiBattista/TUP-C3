const { useEffect, useState } = require("react")

const API_KEY = '30d38b26954359266708f92e1317dac0'
 
function Mostar()
{
    const[valores,setValores]=useState("")
    const[iconos,setIconos]=useState("")
    const[buscar,setBuscar]=useState("argentina")
  const URL=`https://api.openweathermap.org/data/2.5/weather?q=${buscar}&lang=es&units=metric&appid=30d38b26954359266708f92e1317dac0`
  const getData=async()=> { await fetch(URL)
     .then(Response=>{return Response.json()})
    .then(Data=> {
            console.log(Data.main)
            console.log(Data)
        if(Data.cod >=400)
            {
                setValores(false)
            }else
            {   console.log(Data)
                setValores(Data)
                console.log(Data.weather[0].main)
                setIconos(Data.weather[0].main)
            }

         })
         .catch(Error=>{console.log(Error)})
            
        } 

const Buscar=(e)=>
 {  
    if(e.key=="Enter")
    {
        console.log(e.target.value)        
        setBuscar(e.target.value)

        }
    
    }
useEffect(()=>
        {
            getData()
        },[buscar])

 const Iconos=(iconos)=>
  { switch (iconos) {
    case "tormenta":
      iconos="thunderstorms-night.svg"
      console.log("tormenta")
      break;
      case "llovizna":
      iconos="drizzle.svg"
       console.log("llovizna")
       break;
       case "lluvia":
       iconos="rain.svg"
       console.log("lluvia")
       break;
       case "nieve":
      iconos="snow.svg"
       console.log("nieve")
      break;
      case "limpio":
      iconos="clear-day.svg"
        console.log("limpio")
       break;
       case "nubes":
       iconos="fog.svg"
        console.log("nubes")
       break;
      case "bruma":
     iconos="haze.svg"
       console.log("bruma")
            break;            
  
    default:
      iconos="clear-day.svg"
      console.log("limpio")
  }
   return iconos
  }

  const buscarProvincia = (provincia) => {
    setBuscar(provincia)
}

return(
  <>
<nav>
  <ul>
    <li><strong>Clima</strong></li>
  </ul>
  <ul>
    <li><a  onClick={() => buscarProvincia("Tucuman")}>Tucuman</a></li>
    <li><a onClick={() => buscarProvincia("Salta")}  >Salta</a></li>
    <li><a  onClick={() => buscarProvincia("Buenos Aires")}>Buenos Aires</a></li>
  </ul>


</nav>
 
  <input

  type="search"
  placeholder="BUSCAR"
  onKeyDown={Buscar}
     />


<div className="card">
 
 { (valores) ? ( 
  <div className="contendor">  
    <h1> {valores.name}</h1> 
    <img src={Iconos(iconos)} className="imagen" />
     <p> <strong>Temperatura:{valores.main.temp}&deg;</strong></p>

    <div>
      <p> maxima:{valores.main.temp_max}&deg; /
      minima: {valores.main.temp_min}&deg; </p>
      <p>humedad:{valores.main.humidity}</p>
    </div>

    </div>
   ) :
    ( 
      <h2>{"dato no encontrado"} </h2>
    )
  }

</div>

</>
)
}
function App() {
    return (
      <>
    <div>
           < Mostar/>
           </div>

    </>
    )
}