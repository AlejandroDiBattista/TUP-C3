import Datos from './datos.js'

const ordenarNombre = (a, b) => {
    if (a.apellido < b.apellido) return -1
    if (a.apellido > b.apellido) return 1
    if (a.nombre < b.nombre) return -1
    if (a.nombre > b.nombre) return 1
    return 0
}

const traerContacto = id =>
    Datos.traer().find(dato => dato.id === id)

const traerContactos = favorito => {
    let datos = Datos.traer()

    datos.sort(ordenarNombre)
    if (favorito === undefined) return datos
    return datos.filter(dato => dato.favorito === favorito)
}

const cambiarFavorito = (id, estado) => {
    let datos = Datos.traer()
    let contacto = datos.find(dato => dato.id === id)
    if (contacto === undefined) return

    if (estado !== undefined) {
        contacto.favorito = estado
    } else {
        contacto.favorito = !contacto.favorito
    }
    Datos.guardar(datos)
}

export { traerContactos, cambiarFavorito }