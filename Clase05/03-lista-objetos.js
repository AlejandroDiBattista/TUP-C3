let productos = [
    {id: 1, nombre: "Coca",   precio: 10},
    {id: 2, nombre: "Fanta",  precio: 20},
    {id: 3, nombre: "Sprite", precio: 30},
    {id: 4, nombre: "Pepsi",  precio: 40},
]

// Quiero una lista con los productos
let caros   = productos.filter(p => p.precio >= 30)
let baratos = productos.filter(p => p.precio <  30)

// Convierto un array de productos en un array de precios
let precios = productos.map(p => p.precio)
precios //> [10, 20, 30, 40]

let maximo = Math.max(...precios)       //> 40 | Calculo el máximo usando el operador 'spread'

// Convierto un array de productos en un array de nombres
let nombres = productos.map(p => p.nombre)
nombres //> ["Coca", "Fanta", "Sprite", "Pepsi"]


// Crear una función que filtre los productos caros
function filtrarCaros(productos){
    let resultado = []
    for(let o of productos){
        if(o.precio >= 30){
            resultado.push(o)
        }
    }
    return resultado
}

caros = filtrarCaros(productos)
caros //> [{id: 3, nombre: "Sprite", precio: 30}, {id: 4, nombre: "Pepsi", precio: 40}]

// Crear una función que filtre los productos baratos
function filtrarBaratos(productos){
    let resultado = []
    for(let o of productos){
        if(o.precio < 30){
            resultado.push(o)
        }
    }
    return resultado
}

// Las funciones 'filtrarCaros' y 'filtrarBaratos' son muy similares solo cambia la condición

// Crear una función generica para filtrar una lista que cumpla una condición
function filtrar(productos, condicion){
    let resultado = []
    for(let o of productos){
        if(condicion(o)){
            resultado.push(o)
        }
    }
    return resultado
}

// Crear una función que filtre los productos caros
baratos = filtrar(productos, p => p.precio < 30)
baratos //> [{id: 1, nombre: "Coca", precio: 10}, {id: 2, nombre: "Fanta", precio: 20}]

// Crear una función que filtre los productos baratos
caros = filtrar(productos, p => p.precio >= 30)

//==
// La función 'filtrar' es muy similar a la función 'filter' de JavaScript
baratos = productos.filter(p => p.precio < 30)
caros = productos.filter(p => p.precio >= 30)

// Las funciones map y filter son muy comunes en programación funcional
// Se pueden encadenar para hacer operaciones más complejas

let preciosCaros = productos
            .filter(p => p.precio >= 30)  // Filtro los productos caros
            .map(p => p.precio)           // Me quedo con los precios
preciosCaros //> [30, 40]

let nombresCaros = productos
    .filter(p => p.precio >= 30)            // Filtro los productos caros
    .map(p => p.nombre)                     // Me quedo con los nombres
    .sort()                                 // Ordeno alfabéticamente
nombresCaros //> ["Pepsi", "Sprite"]

