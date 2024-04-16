///----------------------///

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

let multiplicar = function (a, b) {      // Función anónima
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
    let nombre = persona.nombre;
    let apellido = persona.apellido;
    return `${nombre} ${apellido}`;
}

// usando desestructuración de objetos
function nombreCompleto3(persona) {
    let { nombre, apellido } = persona;
    return `${nombre} ${apellido}`;
}

// usando desestructuración de objetos en los parámetros
function nombreCompleto4({ nombre, apellido }) {
    return `${nombre} ${apellido}`;
}

// Objetos y funciones

let contacto = {
    nombre: "Juan",
    apellido: "Perez",
    nombreCompleto: function () {
        return `${this.nombre} ${this.apellido}`;
    }
};

persona.nombreCompleto();  // "Juan Perez"

function Personas(nombre, apellido) {   // Función constructora (constructor function)
    return {
        nombre: nombre,
        apellido: apellido,
        nombreCompleto: function () { return `${this.nombre} ${this.apellido}`; },
        toString() { return this.nombreCompleto(); },
        toJSON() { return JSON.stringify(this); }
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

if (a < b) {
    min = a;
} else {
    min = b;
}

let c = 5;

// El minimo de 3 numeros

// Aproximación basica  // IF anidadas
if (a < b) {
    if (a < c) {
        min = a;    // a < b y a < c
    } else {
        min = c;    // a < b y c < a
    }
} else {
    if (b < c) {      // b < a
        min = b;    // b < a && b < c
    } else {
        min = c;    // b < a && c < b
    }
}

// Aproximación mejorada // IF encadenadas
if (a < b && a < c) {    // Es a el menor de todos
    min = a;
} else if (b < c) {       // Es b el menor de todos
    min = b;
} else {
    min = c;            // Es c el menor de todos
}

min = a;                // Suponemos que a es el menor
if (b < min) min = b;    // Si b es menor que a, entonces b es el menor
if (c < min) min = c;    // Si c es menor que el minimo, entonces c es el menor

let d = 15, e = 7;

min = Infinity;  // Suponemos que el minimo es infinito (Todos los numeros son menores que infinito)
if (a < min) min = a;
if (b < min) min = b;
if (c < min) min = c;
if (d < min) min = d;
if (e < min) min = e;

// Existen funciones en la librería Math que permiten calcular el mínimo y el máximo de varios números
min = Math.min(a, b, c, d, e);
let max = Math.max(a, b, c, d, e);

let edades = [30, 25, 40, 35, 20];
let menorEdad = Math.min(...edades);    // Spread operator

const Mate = {
    minimo: function (a, b) {
        if (a < b)
            return a;
        else
            return b;
    },
    maximo: function (a, b) {
        return a > b ? a : b;
    }
}

Mate.minimo(10, 20);
Mate.maximo(10, 20);

// Switch

let dia = 3;
let nombreDia;

switch (dia) {
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

for (let i = 0; i < 10; i++) {
    console.log(i);
}

let suma = 0;       // Calcular la suma de los números del 1 al 100
for (let i = 1; i <= 100; i++) {
    suma += i;
}

let importes = [10, 20, 30, 40, 50];
let importeTotal = 0;
for (let i = 0; i < importes.length; i++) {   // Calcular el importe total de una lista de importes
    let importe = importes[i];
    importeTotal += importe;
}
console.log(`El importe total es ${importeTotal}`);

// For...of     // Itera sobre los elementos de un objeto iterable (arrays, strings, maps, sets, etc)

let vocales = "aeiou";
for (let vocal of vocales) {
    console.log(vocal);
}

importeTotal = 0;
for (let importe of importes) {
    importeTotal += importe;
}

// For...in     // Itera sobre las propiedades enumerables de un objeto

let claves = Object.keys(persona);
for (let clave of claves) {
    let valor = persona[clave];
    console.log(`${clave}: ${valor}`);
}

// Equivalente a:
for (let clave in persona) {
    let valor = persona[clave];
    console.log(`${clave}: ${valor}`);
}

let lista = [1, 1, 3, 5, 8, 13, 21, 34, 55, 89];

// Recorrer una lista con un ciclo for(;;)
for (let i = 0; i < lista.length; i++) {
    console.log(lista[i]);
}

// Recorrer una lista con un ciclo for...of
for (let elemento of lista) {
    console.log(elemento);
}

// Recorrer una lista con un ciclo forEach
lista.forEach(function (elemento) {
    console.log(elemento);
});

suma = 0;   // Calcular la suma de los elementos de la lista
for (let i; i < lista.length; i++) {
    let x = lista[i];
    suma += x;
}
suma = 0;
for (let x of lista) {
    suma += x;
}

let cuenta = 0;
for (let x of lista) {
    cuenta++;
}

producto = 1;
for (let x of lista) {
    producto *= x;
}

function recorrer(lista, accion) {
    for (let x of lista) {
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

function mapear(lista, accion) {
    let resultado = [];
    for (let x of lista) {
        resultado.push(accion(x));
    }
    return resultado;
}

doble = mapear(lista, x => x * 2);
let triple = mapear(lista, x => x * 3);
triple = lista.map(x => x * 3);             // Método map de los arrays

function filtrar(lista, condicion) {
    let resultado = [];
    for (let x of lista) {
        if (condicion(x)) {
            resultado.push(x);
        }
    }
    return resultado;
}

let pares = filtrar(lista, x => x % 2 === 0);
let impares = filtrar(lista, x => x % 2 !== 0);

pares = lista.filter(x => x % 2 === 0);     // Método filter de los arrays
impares = lista.filter(x => x % 2 !== 0);

function reducir(lista, accion, valorInicial) {
    let acumulador = valorInicial;
    for (let x of lista) {
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
    { nombre: "Laptop", precio: 1500 },
    { nombre: "Mouse", precio: 20 },
    { nombre: "Teclado", precio: 50 },
    { nombre: "Monitor", precio: 300 }
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
while (n <= 100) {        // for(...; n <= 100; ...)      // Condición
    suma += n;
    n++;                // for(...; ...; n++)           // Actualización
}

function incluye(lista, valor) {
    let i = 0;
    while (i < lista.length) {
        if (lista[i] === valor) {
            return true;
        }
        i++;
    }
    return false;
}

function incluye1(lista, valor) {
    for (let x of lista) {
        if (x === valor) {
            return true;
        }
    }
    return false;
}

function incluye2(lista, valor) {
    return lista.includes(valor);
}

const incluye3 = (lista, valor) => lista.includes(valor);

