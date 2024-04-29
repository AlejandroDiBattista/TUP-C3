const log=(texto) => console.log(texto, new Date().toLocaleTimeString()); 

const url = 'https://jsonplaceholder.typicode.com/todos/1'

async function main(){
    log("1. Antes de fetch")
    let response = await fetch(url)
    let json = await response.json()
    log("2. Mostrado algo", json)
    log("3. Después de fetch")
}

console.clear()
// Programa principal
log("0. Antes del main")
main()
log("4. Después del main")