// Declaración de una función tradicional

function suma(a,b){
    return a + b;
}

// Las funciones son objetos de primera clase
let otra = suma;

suma(1,2)   //> 3
otra(1,2)   //> 3   | otra es una referencia a la función suma | otra es un alias de suma

// Declaración de una función como expresión
const sumar1 = function(a,b){
    return a + b;
}

let punto = { x: 10, y: 20 }

mostrar( punto )            // Llamada a la función mostrar con un objeto como argumento
mostrar({x: 10, y: 20})     // Llamada a la función pasando directamente un objeto como argumento


// Declaración de una función flecha
let sumar2 = (a, b) => {
    return a + b;
}

// Forma simplificada de una función flecha 
// Si solo retorna un valor, se puede omitir la palabra return y las llaves
let sumar3 = (a, b) => a + b;


// Ejemplo de como recorrer un array con un ciclo for
let numeros = [1,2,3,4,5,6,7,8,9,10]

for(let x of numeros){
    console.log(x)                  // Imprime cada elemento del array
}

// Un segundo ejemplo de recorrer un array con un ciclo for
for(let x of numeros){
    console.log("El número es: ",x) // Imprime cada elemento del array con un mensaje
}

// Funcion generica para recorrer cualquier lista y ejecutar una accion
function recorrer(lista, accion){
    for(let x of lista){
        accion(x);
    }
}

// Defino dos funciones para mostrar un valor
const mostrar = (x) => console.log(x)
const mostrarMensaje = x => console.log("El número es: ",x)

// Las funciones se pueder llamar directamente
mostrar(10)         //> 10
mostrarMensaje(10)  //> El número es: 10

// Llamo a la función recorrer pasando el array de números y la función mostrar
recorrer(numeros, mostrar)
recorrer(numeros, mostrarMensaje)

// Llamo a la función definiendo la función directamente 
recorrer(numeros, x => console.log(x))

// Llamo a la función definiendo la función directamente
recorrer(numeros, console.log)

let log = console.log // log es una referencia a la función console.log
recorrer(numeros, log)
recorrer(numeros, console.log)

// === 
// La funcion 'recorrer' tiene un equivalente en los arrays que se llama 'forEach'
numeros.forEach(x => console.log(x))
numeros.forEach(console.log)

// Las funciones se pueden asignar a propiedades de un objeto
let persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    mostrar: function(){
        console.log(this.nombre, this.apellido, this.edad) // this === el objeto persona
    }
}

// Accedo a las propiedades del objeto persona 
persona.nombre = "Pedro"
// Accedo a la función mostrar del objeto persona
persona.mostrar()


// Las funciones se pueden agrupar en un objeto
const console = {
    log: function(x){
        alert(x)
    },
    info: function(x){
        alert(x)
    }
}

console.log("Hola")
console.info("Hola")

// Las funciones de libreía Math agrupan funciones matemáticas
Math.min(1, 2, 3) //> 1
Math.max(1, 2, 3) //> 3

Math.random() //> 0.123456789

// Simulación de una librería de funciones matemáticas
const Matematica = {
    minimo: function(...numeros){
        let min = numeros[0];
        for(let x of numeros){
            if(x < min) min = x;
        }
        return min;
    },

    maximo: function(...numeros){
        let max = numeros[0];
        for(let x of numeros){
            if(x > max) max = x;
        }
        return max;
    },

    aleatorio: function(){
        return Math.random();
    }
}

Matematica.minimo(1,2,3,4,5,6,7,8,9,10) //> 1
Matematica.maximo(1,2,3,4,5,6,7,8,9,10) //> 10
Matematica.aleatorio() //> 0.123456789

// Tambien podriamos tener 'minimo' y 'maximo' en un objeto Productos
const Productos = {
    maximo: function(...productos){},
    minimos: function(...productos){}
}

Matematica.maximo(1,2,3,4,5,6,7,8,9,10) //> 10
Productos.maximo([{precio: 10}, {precio: 20}]) //> 10

// Ejemplo de como recorrer un array y aplicar una función a cada elemento

// Quiero tener una lista con los dobles de los números
let dobles = []
for(let x of numeros){
    dobles.push(x * 2)
}
dobles //> [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Quiero tener una lista con los triples de los números
let triples = []
for(let x of numeros){
    triples.push(x * 3)
}
triples //> [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// Las dos funciones anteriores son muy similares, solo cambia la operación (x * 2) y (x * 3)

// Funcion generica para mapear (transformar) una lista 
function mapear(lista, accion){
    let resultado = []
    for(let x of lista){
        let valor = accion(x);
        resultado.push(valor)
    }
    return resultado;
}

// Defino dos funciones para usar en el mapeo
let doble  = x => x * 2
let triple = x => x * 3

// Se pueden llamar directamente
doble(10)   //> 20
triple(10)  //> 30

// Llamo a la función mapear pasando el array de números y la función doble
dobles  = mapear(numeros, doble)
triples = mapear(numeros, triple)

// Las funciones se pueden definir directamente
let cubo = x => x * x * x
let cubos = mapear(numeros, cubo) //Usando cubo como variable auxiliar

cubos = mapear(numeros, x => x * x * x) // Definiendo la función directamente

/// ===
// Los arrays tienen un método 'map' que hace lo mismo que la función 'mapear'
cubos = numeros.map(x => x * x * x)
dobles = numeros.map(x => x * 2)
triples = numeros.map(x => x * 3)

