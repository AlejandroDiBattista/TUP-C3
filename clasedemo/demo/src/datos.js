console.log("Cargando libreria datos")

const DatosIniciales = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '(381) 123-4560', favorito: true },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', telefono: '(381) 654-3210', favorito: false },
    { id: 3, nombre: 'Pedro', apellido: 'Rodriguez', telefono: '(381) 987-6540', favorito: true },
    { id: 4, nombre: 'Ana', apellido: 'Martinez', telefono: '(381) 456-7890', favorito: false },
    { id: 5, nombre: 'Luis', apellido: 'Gonzalez', telefono: '(381) 321-6540', favorito: false },
    { id: 6, nombre: 'Laura', apellido: 'Lopez', telefono: '(381) 789-4560', favorito: false },
    { id: 7, nombre: 'Carlos', apellido: 'Sanchez', telefono: '(381) 654-9870', favorito: false },
    { id: 8, nombre: 'Sara', apellido: 'Fernandez', telefono: '(381) 987-4560', favorito: false },
    { id: 9, nombre: 'Jorge', apellido: 'Ramirez', telefono: '(381) 654-7890', favorito: true },
]

let datos = null

function traer() {
    datos = window.localStorage.getItem('datos')
    if (datos) {
        datos = JSON.parse(datos)
    } else {
        datos = DatosIniciales
        guardar(datos)
    }
    return datos
}

function guardar(datos) {
    window.localStorage.setItem('datos', JSON.stringify(datos))
}

const Datos = { traer, guardar }
export default Datos
export { traer, guardar }