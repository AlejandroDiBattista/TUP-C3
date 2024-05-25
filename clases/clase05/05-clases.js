let persona = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    mostrar: function(){
        console.log(this.nombre, this.apellido, this.edad)
    }
}

persona.mostrar()
//> "Juan Perez 30"

function Persona(nombre, apellido, edad){
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
    this.mostrar = function(){
        console.log(this.nombre, this.apellido, this.edad)
    }
}

let juan = Persona("Juan", "Perez", 30)
let maria = Persona("Maria", "Lopez", 25)

juan.mostrar()
maria.mostrar()

let d = new Date()
d //> 2021-09-21T00:00:00.000Z
d.getFullYear() //> 2021
d.getMonth() //> 8

d = new Date(2021, 8, 21)
d //> 2021-09-21T00:00:00.000Z
d.getFullYear() //> 2021
d.getMonth() //> 8

class Persona {
    constructor(nombre, apellido, edad){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
    }
    mostrar(){
        console.log(this.nombre, this.apellido, this.edad)
    }
    cumplir(){
        this.edad++
    }
}

juan = new Persona("Juan", "Perez", 30)
juan.complir()
juan //> {nombre: "Juan", apellido: "Perez", edad: 31}


maria = new Persona("Maria", "Lopez", 25)

class Empleado extends Persona {
    constructor(nombre, apellido, edad, sueldo){
        super(nombre, apellido, edad)
        this.sueldo = sueldo
    }
    mostrar(){
        super.mostrar()
        console.log(this.sueldo)
    }
    aumentar(incremento){
        this.sueldo += incremento
    }
}

let empleado = new Empleado("Juan", "Perez", 30, 1000)
empleado.mostrar() //> Juan Perez 30 1000
empleado.aumentar(500)
empleado.mostrar() //> Juan Perez 30 1500
empleado.cumplir()
empleado.mostrar() //> Juan Perez 31 1500



