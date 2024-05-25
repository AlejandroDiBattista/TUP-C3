const log=(texto) => console.log(texto, new Date().toLocaleTimeString()); 
console.clear()

const mostrar = () => log("2. Mostrado algo")

// Programa principal
log("1. Inicio")
// mostrar()
// setTimeout(mostrar, 2000)
setInterval(mostrar, 100)
log("3. Fin")
