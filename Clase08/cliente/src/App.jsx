import { useState } from 'react'
import './App.css'
import { Contador } from './Contador'
import { Mostrar } from './Mostrar'

const Contadores = [
{ id: 1, nombre: 'Coca Cola', inicial: 5, editando: false },
{ id: 2, nombre: 'Pepsi Cola', inicial: 3, editando: true },
{ id: 3, nombre: 'Fanta', inicial: 2, editando: false },
{ id: 4, nombre: 'Sprite', inicial: 1, editando: false },
{ id: 5, nombre: 'Manzanita', inicial: 0, editando: false },
]

function App() {
  let [contadores, setContadores] = useState(Contadores)

  function editar(id) {
    let copia = [...contadores]
    
    let indice = copia.findIndex(c => c.id === id)
    copia[indice].editando = true

    setContadores(copia)
    console.log('Editar', id)
  }

  return (
    <>
      {contadores.map((contador) => (
        contador.editando
          ? <Contador key={contador.id}
              nombre={contador.nombre}
              inicial={contador.inicial} />
          : <Mostrar key={contador.id}
              nombre={contador.nombre}
              inicial={contador.inicial}
              alEditar={() => editar(contador.id)}
          />
      ))
      }
    </>
  )
}

export default App
