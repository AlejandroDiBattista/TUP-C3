let a = [10, 20, 30]

for(let i = 0; i < a.length; i++) {
    console.log(a[i])
}

let b = { 0: 10, 1: 20, 2: 30, length: 3 }

for (let i = 0; i < b.length; i++) {
    console.log(b[i])
}

class Persona {
    constructor(nombre, apellido, telefono) {
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
    }
}

let juan = { nombre: "Juan", apellido: "Perez", telefono: 987654321 }
let maria = new Persona("Maria", "Gomez", 456789123)


juan.nombre
maria.nombre

