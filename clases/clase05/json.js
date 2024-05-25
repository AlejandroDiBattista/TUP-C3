
let productos = [
	{nombre: 'Cola Cola', precio: 100},
	{nombre: 'Pepsi Cola', precio: 80}
]

let productosJSON = JSON.stringify(productos) // convierte un objeto en un string
console.log(productosJSON) 
//> '[{"nombre":"Cola Cola","precio":100},{"nombre":"Pepsi Cola","precio":80}]'

let texto = '[{"nombre":"Cola Cola","precio":100},{"nombre":"Pepsi Cola","precio":80}]'

let productosParseados = JSON.parse(texto) // convierte un string en un objeto
console.log(productosParseados) //> [ { nombre: 'Cola Cola', precio: 100 }, { nombre: 'Pepsi Cola', precio: 80 } ]

console.log(JSON.stringify(productos,null, 4)) //> 4 es la cantidad de espacios que se le agregan a la indentación
/*

[
    {
        "nombre": "Cola Cola",
        "precio": 100
    },
    {
        "nombre": "Pepsi Cola",
        "precio": 80
    }
]

*/
