import { useState } from 'react'
import './App.css'

function useContador() {
  const [contador, setContador] = useState(0)

  function sumar() {
    if (contador === 10) return
    setContador(contador + 1)
  }

  function restar() {
    if (contador === 0) return
    setContador(contador - 1)
  }

  return [contador, sumar, restar]
}

function ContarProductos() {
  let [contador, sumar, restar] = useContador()
  return (
    <div>
      <button onClick={restar}>-1</button>
      <h1>Productos {contador}</h1>
      <button onClick={sumar}>+1</button>
    </div>
  )

}
function App() {

  function traer() {  
    console.log("traer")
    fetch('http://localhost:3000/personas')
      .then(response => {
        return response.json()
      }).then(data => console.log(data))
  }

  return (
    <>
      <h1>Trayendo datos</h1>
      <button onClick={traer}>Traer</button>
    </>
  )
}

export default App
