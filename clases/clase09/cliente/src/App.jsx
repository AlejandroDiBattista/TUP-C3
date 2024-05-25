import { useState } from 'react'

function App() {
  let [users, setUsers] = useState([])

  function traer() {
    console.log("1. Antes del fech")
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(json => {
        console.log("2. en el fectch")
        return setUsers(json)
      })
      .catch(error => console.error(error))
      .finally(() => console.log("4. en el finally"))
    console.log("3. Después del fetch")
  }

  async function traerAsincrono() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await response.json()
    setUsers(json)
  }

  return (
    <>
      <h1>Traer Datos del Servidor</h1>
      <button onClick={traer}>Traer</button>
      {users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </>
  )
}

export default App
