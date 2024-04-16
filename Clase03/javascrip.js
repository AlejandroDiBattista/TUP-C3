/* 
 * Repaso del curso de JavaScript 
 */


/// Identificadores. 

// Se forma de letras, numeros, _ y $. No puede empezar con un numero
// No se pueden usar palabras reservadas (if, else, let, const, var, function, etc)

let nombreCompleto = "Juan Perez";  // CamelCase     => Variables y funciones
class Producto { };                 // PascalCase    => Clases
const FUERZA_GRAVEDAD = 9.81;       // Uppercase     => Constantes

// Distingue entre mayusculas y minusculas
// nombre != Nombre != NOMBRE != nOmbre != nombrE .....


/// Variables

var nombre = "Juan"; // Forma vieja, no usar

let nombre = "Juan";     // Declara una variable en un bloque de código 
const Nombre = "Juan";   // Declara una constante en un bloque de código

// La declaración en una forma abreviada de "declarar" y "definir" una variable
let apellido;            // Declarar pero no tiene un valor  => typeof(nombre1) = undefined
apellido = "Perez"       // Define una variable (le asigna un valor)


/// Tipos de datos

// Primitivos
let calle = "San Martín";   // String
let edad = 30;              // Number
let esEstudiante = true;    // Boolean

// String: Cadena de texto, una secuencia de caracteres
calle = "San Martín";       // Comillas dobles 
calle = 'San Martín';       // Comillas simples
calle = `San Martín`;       // Comillas invertidas (backticks) => Interpolación de Strings


nombreCompleto = nombre + " " + apellido;  // Concatenación de Strings
nombreCompleto = `${nombre} ${apellido}`;  // Interpolación de Strings

let texto
texto = "Hola, soy " + nombre + " y tengo " + edad + " años";
texto = `Hola, soy ${nombre} y tengo ${edad} años`;

let largo = texto.length;   // Longitud de la cadena de texto
let mayusculas = texto.toUpperCase();  // Convertir a mayúsculas
let minusculas = texto.toLowerCase();  // Convertir a minúsculas

let subcadena = texto.substring(5, 10);  // Extraer una subcadena
let caracter = texto.charAt(0);          // Extraer un caracter

let texto2 = "Hola, soy Juan y tengo 30 años";
let posicion = texto2.indexOf("Juan");      // Buscar la posición de una subcadena
let contiene = texto2.includes("Juan");     // Verificar si una cadena contiene una subcadena
let empieza = texto2.startsWith("Hola");    // Verificar si una cadena empieza con una subcadena
let termina = texto2.endsWith("años");      // Verificar si una cadena termina con una subcadena

// Number: Números enteros, decimales, positivos, negativos, etc
let cantidad = 10;
let precio = 15.99;

// Operaciones aritméticas
let total = cantidad * precio;
let expresion = 1 + 2 * 3       // Primero el producto despues las sumas
let parentesis = (1 + 2) * 3    // Primero las sumas despues el producto
let modulo = 10 % 3;            // Resto de la división
let izquierda = 8 / 4 / 2;      // Asociatividad de izquierda a derecha => (8 / 4) / 2
let derecha = 8 / (4 / 2);      // Asociatividad de derecha a izquierda => 8 / (4 / 2)

// Boolean: Verdadero o falso | true o false
// El resultado de una decisión (o una comparación) es un valor booleano

let esMayor = edad > 18;
let esMenor = edad < 18;
let esIgual = edad == 18;  // Comparación de igualdad

let esDiferente = edad != 18;  // Comparación de desigualdad

// Lo que no sea false, undefined, null, 0, NaN o "" es verdadero

true == "a"
true == 1
true == []
true == {}

false == ""
false == 0
false == null
false == undefined

// Conversion de tipos

Number("10");           // => 10
parseInt("10")

Number("10.5");         // => 10.5
parseFloat("10.5")

Number("10,5");         // => NaN

String(10);             // => "10"
String(true)            // => "true"
String(false)           // => "false"

Boolean(10);            // => true
Boolean("true");        // => true

Boolean(0);             // => false
Boolean("");            // => false
Boolean("false")        // => true

// No mezclar tipos de datos (tipado débil)
10 + "5"                // => "105"
10 - "5"                // => 5


/// Tipos de datos compuestos

// Array: Colección de elementos (pueden ser de diferentes tipos)

let frutas = ["Manzana", "Banana", "Naranja"];
let numeros = [1, 2, 3, 4, 5];

let mixto = ["Manzana", 1, true, null, undefined, [1, 2, 3]];

// Acceder a los elementos de un array
let primeraFruta = frutas[0];  // Acceder al primer elemento
let ultimaFruta = frutas[frutas.length - 1];  // Acceder al último elemento

// Modificar un elemento de un array
frutas.push("Pera");  // Agregar un elemento al final        => ["Manzana", "Banana", "Naranja", "Pera"]
frutas.pop();         // Eliminar el último elemento         => ["Manzana", "Banana", "Naranja"]

frutas.unshift("Pera");  // Agregar un elemento al principio => ["Pera", "Manzana", "Banana", "Naranja"]
frutas.shift();          // Eliminar el primer elemento      => ["Manzana", "Banana", "Naranja"]


numeros.slice(1, 3);     // Extraer una sublista    => [2, 3]
numeros.splice(1, 3);    // Eliminar elementos      => [1, 5]

numeros.indexOf(3);    // Buscar la posición de un elemento
numeros.includes(3);   // Verificar si un elemento está en la lista

numeros.length;       // Longitud de la lista


/// Desestructuración de Arrays

let [fruta1, fruta2, fruta3] = frutas;
// Equivalente a:
// let fruta1 = frutas[0];
// let fruta2 = frutas[1];
// let fruta3 = frutas[2];

let [primero, ...resto] = frutas;
// Equivalente a:
// let primero = frutas[0];
// let resto = frutas.slice(1);


/// Object: Colección de pares clave-valor (propiedades)

let persona = { // Objeto literal 
    "nombre": "Juan",
    "apellido": "Perez",
    "edad": 30,
    "esEstudiante": true
};

// Cuando las claves son identificadores válidos, se pueden omitir las comillas
persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    esEstudiante: true, 
    esRegular: true 
};


let nombre = persona.nombre;  // Acceder a una propiedad (sintaxis de punto; cuando la clave es un identificador válido) 
nombre = persona["nombre"];   // Acceder a una propiedad (sintaxis de corchetes; siempre funciona)

persona.nombre = "Pedro";     // Modificar una propiedad
persona["nombre"] = "Pedro";  // Modificar una propiedad

persona.telefono = "123456";  // Agregar una propiedad (dinámicamente)
delete persona.edad;          // Eliminar una propiedad

let propiedades = Object.keys(persona);  // Obtener las propiedades
let valores = Object.values(persona);    // Obtener los valores

persona.toString();  // Método heredado de Object
"nombre" in persona; // Verificar si una propiedad existe

// Desestructuración de Objetos
let { nombre: primeNombre, apellido: ultimoNombre, esRegular } = persona;
// Equivalente a:
// let primerNombre = persona.nombre;
// let ultimoNombre = persona.apellido;
// let esRegular = persona.esRegular;

let punto = { x: 10, y: 20 };
let {x, z = 100} = punto;
// Equivalente a:
// let x = {x: 10}.x;
// let z = {x: 10}.z || 100;

let { x: x1, y: y1 } = punto;
// Equivalente a:
// let x1 = punto.x;
// let y1 = punto.y;


/// JSON: JavaScript Object Notation
// Formato de intercambio de datos (ligero, fácil de leer y escribir)

let personaJSON   = JSON.stringify(persona);    // Convertir un objeto a JSON
let personaObjeto = JSON.parse(personaJSON);    // Convertir JSON a un objeto

let compra = { // Representación de un objeto en JavaScript
    cliente: { nombre: "Juan", apellido: "Perez" },
    compras: [
        { producto: "Laptop", precio: 1500, cantidad: 1, },
        { producto: "Mouse",  precio: 20,   cantidad: 2, }
    ],
    pago: {
        metodo: "tarjeta",
        cuotas: 3,
        importeCuota: 600,
        total: 1600,
    }, 
    total: 1540
}

compra = {  // Representación de un objeto en JSON
    "cliente": {"nombre": "Juan", "apellido": "Perez"},
    "compras": [
        {"producto": "Laptop", "precio": 1500, "cantidad": 1},
        {"producto": "Mouse", "precio": 20, "cantidad": 2}
    ],
    "pagon": {
        "metodo": "tarjeta",
        "cuotas": 3,
        "importeCuota": 600,
        "total": 1600
    }, 
    "total": 1540
}

