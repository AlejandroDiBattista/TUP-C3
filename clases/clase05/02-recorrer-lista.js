const texto = "El 100 es mayor al 20" // Las cadenas son listas de caracteres

// Quiero extraer los números de la cadena
let digitos = []
for(let l in texto){
    if(l >= "0" && l <= "9"){   // Si es un dígito
        digitos.push(l)         // Lo agrego a la lista
    }
}
digitos //> ["1", "0", "0", "2", "0"]
digitos.join("") //> "10020" | Junto los elementos de la lista en una cadena


// Funcion generica para filtrar una lista
function filtrar(lista, condicion){
    let resultado = []
    for(let o of lista){
        if(condicion(o)){
            resultado.push(o)
        }
    }
    return resultado
}

let esDigito = letra => letra >= "0" && letra <= "9"
let aux = filtrar(texto, esDigito)  //> "10020"
aux.join("") //> "10020"

aux = filtrar(texto, letra => letra >= "0" && letra <= "9")  //> ["1", "0", "0", "2", "0"]

//===
// La función 'filtrar' es muy similar a la función 'filter' de JavaScript
aux = texto.filter(letra => letra >= "0" && letra <= "9")  //> "10020"

// Defino dos funciones para usar en el filtro
const esPar   = x => x % 2 == 0
const esImpar = x => x % 2 != 0

// Se puede usar directamente 
esPar(100)  //> true
esPar(7)    //> false

esImpar(100) //> false
esImpar(7)    //> true

let numeros = [1,2,3,4,5,6,7,8,9,10]

// Quiero tener una lista con los números pares
let pares = numeros.filter(esPar)
pares //> [2,4,6,8,10]

// Quiero tener una lista con los números impares
let impares = numeros.filter(esImpar)

