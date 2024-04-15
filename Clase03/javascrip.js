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

let primeraFruta = frutas[0];  // Acceder al primer elemento
let ultimaFruta = frutas[frutas.length - 1];  // Acceder al último elemento

frutas.push("Pera");  // Agregar un elemento al final        => ["Manzana", "Banana", "Naranja", "Pera"]
frutas.pop();         // Eliminar el último elemento         => ["Manzana", "Banana", "Naranja"]

frutas.unshift("Pera");  // Agregar un elemento al principio => ["Pera", "Manzana", "Banana", "Naranja"]
frutas.shift();          // Eliminar el primer elemento      => ["Manzana", "Banana", "Naranja"]

numeros.slice(1, 3);     // Extraer una sublista    => [2, 3]
numeros.splice(1, 3);    // Eliminar elementos      => [1, 5]

numeros.indexOf(3);    // Buscar la posición de un elemento
numeros.includes(3);   // Verificar si un elemento está en la lista

numeros.length;       // Longitud de la lista

// Desestructuración de Arrays

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



/// Funciones
// son mini programas que realizan una tarea específica

function saludar() {                    // Declarar una función
    console.log("Hola, mundo!");
}

saludar();                              // Llamar a una función

function saludoPersonal(nombre) {              // Parámetros
    console.log(`Hola, ${nombre}!`);
}

saludoPersonal("Juan");                        // Argumentos

saludoPersonal("Pedro", "Gómez");              // No hay error, pero "Gómez" se ignorará
saludoPersonal();                              // No hay error, pero "undefined" se mostrará

function sumar(a, b) {                  // Parámetros
    return a + b;                       // Retornar un valor
}

let resultado = sumar(5, 3);            // Asignar el valor de retorno

let multiplicar = function(a, b) {      // Función anónima
    return a * b;
}
// equivale a => function multiplicar(a, b){return a * b;}

let mult = multiplicar                  // Las funciones son objetos de primera clase (first-class citizens) 
mult(1, 2) === multiplicar(1, 2)

let producto = multiplicar(5, 3);

// Funciones flecha (arrow functions)
let dividir = (a, b) => { return a / b; }
let residuo = (a, b) => a % b;            // Si la función tiene una sola línea, se puede omitir el return
let incrementar = a => a + 1;             // Si hay un solo parámetro, se pueden omitir los paréntesis
let saludarSimple = () => console.log("Hola!"); // Si no hay parámetros, se debe poner paréntesis

let cuadrado = x => x * x;                // Función con un solo parámetro
let cubo = x => x ** 3;                   // Función con un solo parámetro
let potencia = (x, n) => x ** n;          // Función con varios parámetros

let sumatoria = (...numeros) => {         // Parámetros rest (rest parameters)
    let suma = 0;
    for (let n of numeros) {
        suma += n;
    }
    return suma;
}

let totalSuma = sumatoria(1, 2, 3, 4, 5);

function nombreCompleto1(persona) {
    return `${persona.nombre} ${persona.apellido}`;
}

// usando variables locales 
function nombreCompleto2(persona) {
    let nombre   = persona.nombre;
    let apellido = persona.apellido;
    return `${nombre} ${apellido}`;
}

// usando desestructuración de objetos
function nombreCompleto3(persona) {
    let {nombre, apellido} = persona;
    return `${nombre} ${apellido}`;
}

// usando desestructuración de objetos en los parámetros
function nombreCompleto4({nombre, apellido}) {
    return `${nombre} ${apellido}`;
}

// Objetos y funciones

let contacto = {
    nombre: "Juan",
    apellido: "Perez",
    nombreCompleto: function() {
        return `${this.nombre} ${this.apellido}`;
    }
};

persona.nombreCompleto();  // "Juan Perez"

function Personas(nombre, apellido) {   // Función constructora (constructor function)
    return {
        nombre: nombre,
        apellido: apellido,
        nombreCompleto: function() { return `${this.nombre} ${this.apellido}`;}, 
        toString() { return this.nombreCompleto(); },
        toJSON()   { return JSON.stringify(this); }
    };
}

let p1 = new Personas("Juan", "Perez");
let p2 = new Personas("Pedro", "Gomez");

p1.nombreCompleto();  // "Juan Perez"
p2.nombreCompleto();  // "Pedro Gomez"

// En JavaScript todo es un objeto 

"Juan".toUpperCase();  // "JUAN"
"Juan".toLowerCase();  // "juan"
"Juan".charAt(0);      // "J"
100..toString();       // "100"
100..toFixed(2);       // "100.00"

"Hola, soy Juan".substring(5, 8);  // "soy"
"Hola, soy Juan".indexOf("Juan");   // 9
"Hola, soy Juan".includes("Juan");  // true
"Una palabra de aliento".split(" "); // ["Una", "palabra", "de", "aliento"]
"Una palabra de aliento".replace("palabra", "frase"); // "Una frase de aliento"
"  Hola, mundo!  ".trim();  // "Hola, mundo!"

/// Las fechas son objetos en JavaScript

let hoy = new Date();  // Fecha y hora actual
hoy.getFullYear();      // Año actual (2024)
hoy.getMonth();         // Mes actual (0-11)
hoy.getDate();          // Día del mes (1-31)
hoy.getDay();           // Día de la semana (0-6)
hoy.getHours();         // Hora (0-23)

let nacimiento = new Date(197, 12, 5);  // 25 de diciembre de 2024
let miEdad = hoy.getFullYear() - nacimiento.getFullYear(); 

const MILISEGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

let diasDeVida = (hoy - nacimiento) / MILISEGUNDOS_POR_DIA;  
let añosDeVida = diasDeVida / 365.25;


/// Estructuras de control

// Condicionales

let a = 10, b = 20;
let min; 

if(a < b){
    min = a;
} else {
    min = b;
}

let c = 5;

// El minimo de 3 numeros

// Aproximación basica  // IF anidadas
if(a < b){          
    if(a < c){ 
        min = a;    // a < b y a < c
    } else {
        min = c;    // a < b y c < a
    }
} else {
    if(b < c){      // b < a
        min = b;    // b < a && b < c
    } else {
        min = c;    // b < a && c < b
    }
}

// Aproximación mejorada // IF encadenadas
if( a < b && a < c){    // Es a el menor de todos
    min = a;
} else if(b < c){       // Es b el menor de todos
    min = b;
} else {
    min = c;            // Es c el menor de todos
}

min = a;                // Suponemos que a es el menor
if(b < min) min = b;    // Si b es menor que a, entonces b es el menor
if(c < min) min = c;    // Si c es menor que el minimo, entonces c es el menor

let d = 15, e = 7;

min = Infinity;  // Suponemos que el minimo es infinito (Todos los numeros son menores que infinito)
if(a < min) min = a;
if(b < min) min = b;
if(c < min) min = c;
if(d < min) min = d;
if(e < min) min = e;

// Existen funciones en la librería Math que permiten calcular el mínimo y el máximo de varios números
min = Math.min(a, b, c, d, e);
let max = Math.max(a, b, c, d, e);

let edades = [30, 25, 40, 35, 20];
let menorEdad = Math.min(...edades);    // Spread operator

const Mate = {
    minimo: function(a,b){
        if(a < b) 
            return a;
        else
            return b;
    },
    maximo: function(a,b){
        return a > b ? a : b;
    }
}

Mate.minimo(10, 20);
Mate.maximo(10, 20);

// Switch

let dia = 3;
let nombreDia;

switch(dia){
    case 1: nombreDia = "Lunes"; break;
    case 2: nombreDia = "Martes"; break;
    case 3: nombreDia = "Miércoles"; break;
    case 4: nombreDia = "Jueves"; break;
    case 5: nombreDia = "Viernes"; break;
    case 6: nombreDia = "Sábado"; break;
    case 7: nombreDia = "Domingo"; break;
    default: nombreDia = "🤷🏽‍♂️";
}

// Ciclos

// For

for(let i = 0; i < 10; i++){
    console.log(i);
}

let suma = 0;       // Calcular la suma de los números del 1 al 100
for(let i = 1; i <= 100; i++){
    suma += i;
}

let importes = [10, 20, 30, 40, 50];
let importeTotal = 0;
for(let i = 0; i < importes.length; i++){   // Calcular el importe total de una lista de importes
    let importe = importes[i];	
    importeTotal += importe;
}
console.log(`El importe total es ${importeTotal}`);

// For...of     // Itera sobre los elementos de un objeto iterable (arrays, strings, maps, sets, etc)

let vocales = "aeiou";
for(let vocal of vocales){
    console.log(vocal);
}

importeTotal = 0;
for(let importe of importes){
    importeTotal += importe;
}

// For...in     // Itera sobre las propiedades enumerables de un objeto

let claves = Object.keys(persona);
for(let clave of claves){
    let valor = persona[clave];
    console.log(`${clave}: ${valor}`);
}

// Equivalente a:
for(let clave in persona){
    let valor = persona[clave];
    console.log(`${clave}: ${valor}`);
}

let lista = [1,1,3,5,8,13,21,34,55,89];

// Recorrer una lista con un ciclo for(;;)
for(let i = 0; i < lista.length; i++){
    console.log(lista[i]);
}

// Recorrer una lista con un ciclo for...of
for(let elemento of lista){
    console.log(elemento);
}

// Recorrer una lista con un ciclo forEach
lista.forEach(function(elemento){
    console.log(elemento);
});

suma = 0;   // Calcular la suma de los elementos de la lista
for(let i; i < lista.length; i++){
    let x = lista[i];
    suma += x;
}
suma = 0;
for(let x of lista){
    suma += x;
}

let cuenta = 0;
for(let x of lista){
    cuenta++;
}

producto = 1;
for(let x of lista){
    producto *= x;
}

function recorrer(lista, accion){
    for(let x of lista){
        accion(x);
    }
}

recorrer(lista, x => console.log(x));

suma = 0;
recorrer(lista, x => suma += x);

producto = 1;
recorrer(lista, x => producto *= x);

cuenta = 0;
recorrer(lista, x => cuenta++);

let doble = []
recorrer(lista, x => doble.push(x * 2));

triple = []
lista.forEach(x => triple.push(x * 3));     // Método forEach de los arrays (Equivale a recorrer)

function mapear(lista, accion){
    let resultado = [];
    for(let x of lista){
        resultado.push(accion(x));
    }
    return resultado;
}

doble = mapear(lista, x => x * 2);
let triple =  mapear(lista, x => x * 3);
triple = lista.map(x => x * 3);             // Método map de los arrays

function filtrar(lista, condicion){
    let resultado = [];
    for(let x of lista){
        if(condicion(x)){
            resultado.push(x);
        }
    }
    return resultado;
}

let pares = filtrar(lista, x => x % 2 === 0);
let impares = filtrar(lista, x => x % 2 !== 0);

pares = lista.filter(x => x % 2 === 0);     // Método filter de los arrays
impares = lista.filter(x => x % 2 !== 0);

function reducir(lista, accion, valorInicial){
    let acumulador = valorInicial;
    for(let x of lista){
        acumulador = accion(acumulador, x);
    }
    return acumulador;
}

suma = reducir(lista, (a, b) => a + b, 0);
producto = reducir(lista, (a, b) => a * b, 1);

suma = lista.reduce((a, b) => a + b, 0);    // Método reduce de los arrays
producto = lista.reduce((a, b) => a * b, 1);

// Combinar funciones de orden superior

let cuadrados = lista.map(x => x ** 2);
let sumaCuadrados = cuadrados.reduce((a, b) => a + b, 0);

let sumaPares = lista.filter(x => x % 2 === 0).reduce((a, b) => a + b, 0);

let listaProductos = [
    {nombre: "Laptop", precio: 1500},
    {nombre: "Mouse", precio: 20},
    {nombre: "Teclado", precio: 50},
    {nombre: "Monitor", precio: 300}
];

let totalProductos = listaProductos.map(p => p.precio).reduce((a, b) => a + b, 0);
let productosBaratos = listaProductos.filter(p => p.precio < 100);
let nombresProductos = listaProductos.map(p => p.nombre);
let nombresProductosBaratos = listaProductos.filter(p => p.precio < 100).map(p => p.nombre);

let sumaPrecios = listaProductos.reduce((a, p) => a + p.precio, 0);
sumaPrecios = listaProductos.map(p => p.precio).reduce((a, b) => a + b, 0);

/// While

suma = 0;

let n = 1;              // for(let n = 1; ... ; ... )   // Inicialización
while(n <= 100){        // for(...; n <= 100; ...)      // Condición
    suma += n;
    n++;                // for(...; ...; n++)           // Actualización
}

function incluye(lista, valor){
    let i = 0;
    while(i < lista.length){
        if(lista[i] === valor){
            return true;
        }
        i++;
    }
    return false;
}

function incluye1(lista, valor){
    for(let x of lista){
        if(x === valor){
            return true;
        }
    }
    return false;
}

function incluye2(lista, valor){
    return lista.includes(valor);
}

const incluye3 = (lista, valor) => lista.includes(valor);

