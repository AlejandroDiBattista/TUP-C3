# TUP: Comisión 4

## Material de soporte para el dictado de clases 

Este respositorio contiene el material de soporte para el dictado de las clases.

Contiene código fuente asi como material de lectura.

### Declaración de identificadores

Los identificadores (usado para darle nombre a los distintos elementos de JS) se forman 
con una secuencia letra, digitos, $ y _, pero no pueden conmenzar un digitos y no pueden ser palabas reservadas
(if, let, for, etc..)


```js
// Identicadores validos.
let a = 1
let A = 2

let $ = 1
let _ = 2

let a1 = 3
let _1 = 4

let a_ = 5

let 1a          // No valido | comienza con digito
let a b = 10    // no valido | tiene un espacio
```

Los identificadores son sensibles a las mayusculas y minusculas
```js
    let a = 10
    let A = 20
    a != A      // 
    nombre != Nombre != NOMBRE != nOmbre // etc...
```

Existen algunas convenciones para la formacion de identificadores.

Las variables y funciones se suelen escribir en "camel case"
Todo en minusculas, cuando esta formado por varias palabras 
a partir de la segunda palabra la primer letra va en mayuscula.

```js
    let nombre = "Juan"
    let fechaNacimiento = "10/05/2024"

    function precioPromedio(productos){...}
```

Las clases y constructures se escriben en "Pascal Case" 
Todas las palabras en menusculas exceto la primer letra. 

```js
    class PersonaFisica {...}
    function CrearPersona(){...}
```

Las constantes se escriben todo en mayusculas.
Si tienen multiples palabras se separan con "_"

```js
    const FUERZA_GRAVEDAD = 9.81
    const PRECIO_MAXIMO = 1000
```

Se pueden usar acentos pero suelen dificultar la lectura asi que no es habitual

### Variables 

Las variables es darle un nombre a una memoria. 

