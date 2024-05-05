import './App.css'
import { Contacto } from './Contacto.jsx'
import { traerContactos, cambiarFavorito } from './agenda.js'

function App() {
  cambiarFavorito(1,false)
  cambiarFavorito(2,true)
  cambiarFavorito(3,false)
  let favoritos = traerContactos(true)
  let resto = traerContactos(false)
  return (
    <>
      <h1>Agenda</h1>
      <div className="agenda">
      {favoritos.map((contacto) => <Contacto key={contacto.id} {...contacto} />)}
      </div>
      <div className="agenda">
      {resto.map((contacto) => <Contacto key={contacto.id} {...contacto} />)}
      </div>
    </>
  )
}

export default App
