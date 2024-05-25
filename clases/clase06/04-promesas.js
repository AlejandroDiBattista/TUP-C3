const log=(texto) => console.log(texto, new Date().toLocaleTimeString()); 

const url = 'https://jsonplaceholder.typicode.com/todos/1'

const convertirJson = (response) => response.json()
const mostrarJson = (json) => {
    log("2. Mostrado algo")
    log(json)
}

log("1. Antes de fetch")
fetch(url)
      .then(convertirJson)
      .then(mostrarJson)
      .catch(()=> log("Error"))
log("3. Después de fetch")

