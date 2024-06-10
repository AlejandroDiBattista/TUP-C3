function App() {
  let [valor, setValor] = React.useState(0)
  let [ingreso, setIngreso] = React.useState(false)
  
  async function traer() {
    let res = await fetch("/valor")
    let data = await res.json()
    setValor(data.valor)
  }

  async function incrementar() {
    let res = await fetch("/incrementar",
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ incremento: 2 })
      }
    )
    let data = await res.json()
    setValor(data.valor)
  }
  function login()  { fetch("/login",  { method: 'POST' })}
  function logout() { fetch("/logout", { method: 'POST' })}

  return (
    <div>
      <h1>Contador (en servidor)</h1>
      <div>
        {ingreso
          ? <button onClick={logout}>Logout</button>
          : <button onClick={login}>Login</button>
        }
      </div>
      <div><button onClick={traer}>Leer</button></div>
      <div><button onClick={incrementar}>Incrementar</button></div>
      <h2>Valor: {valor}</h2>
    </div>
  );
}