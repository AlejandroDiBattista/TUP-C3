const base = "http://localhost:3000";

async function llamar(ruta, metodo = "GET", datos = {}) {
  let opciones = {
    method: metodo,
    headers: { "Content-Type": "application/json" },
  };

  if (metodo !== "GET") {
    opciones.body = JSON.stringify(datos);
  }

  try {
    let respuesta = await fetch(`${base}${ruta}`, opciones);
    if (!respuesta.ok) {
      throw new Error(`HTTP error! Status: ${respuesta.status}`);
    }
    return await respuesta.json();
  } catch (error) {
    console.error("Error en la llamada:", error);
    throw error; // Re-throw the error to handle it at the caller's level
  }
}

async function listar() {
  return await llamar("/contactos");
}

async function agregar(datos) {
  return await llamar("/contactos", "POST", datos);
}

async function borrar(id) {
  return await llamar(`/contactos/${id}`, "DELETE");
}

async function actualizar(id, datos) {
  return await llamar(`/contactos/${id}`, "PUT", datos);
}

export default { listar, agregar, borrar, actualizar };