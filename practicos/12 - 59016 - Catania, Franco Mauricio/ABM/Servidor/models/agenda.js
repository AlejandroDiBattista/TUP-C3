import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";
const cliente = new MongoClient(url);

let contactos = null;


async function cargarDatos() {
  try {
    await conectar();
    const cantidad = await contactos.countDocuments({});
    if (cantidad === 0) {
      await contactos.insertMany([
        { nombre: "Juan", apellido: "Perez", telefono: 2124554 },
        { nombre: "Pedro", apellido: "Correa", telefono: 2124554 },
        { nombre: "matias", apellido: "corra", telefono: 2124554 },
        { nombre: "juan", apellido: "fass", telefono: 2124554 },
      ]);
      console.log("Datos iniciales cargados correctamente.");
    }
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error.message);
  }
}

async function conectar() {
  if (contactos !== null) return;
  await cliente.connect();
  const db = cliente.db("agenda");
  contactos = db.collection("contactos");
  await cargarDatos();
}

async function leerTodo() {
  await conectar();
  return await contactos.find({}).sort({ apellido: 1, nombre: 1 }).toArray();
}

async function crear(contacto) {
  await conectar();
  const resultado = await contactos.insertOne(contacto);
  return { _id: resultado.insertedId };
}

async function borrar(id) {
  await conectar();
  await contactos.deleteOne({ _id:  new ObjectId(id) });
}



async function actualizar(id, contactoActualizado) {
  await conectar();
  const { _id, ...contactoSinId } = contactoActualizado; 
  await contactos.updateOne({ _id: new ObjectId(id) }, { $set: contactoSinId });
}

export default {  actualizar, leerTodo, crear, borrar };
