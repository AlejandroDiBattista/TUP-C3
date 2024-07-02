import React, { useState, useEffect } from "react";
import Datos from "./Datos";
import Editar from "./Editar";
import Listar from "./Listar";
import "./App.css";

function App() {
  const [modo, setModo] = useState(null); 
  const [contacto, setContacto] = useState(null);
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const lista = await Datos.listar();
      setContactos(lista);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
    }
  }

  async function actualizar(datosContacto) {
    try {
      if (modo === "editar") {
        await Datos.actualizar(contacto._id, datosContacto);
      } else {
        await Datos.agregar(datosContacto);
      }
      cargar();
      cancelar();
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
    }
  }

  async function borrar(id) {
    try {
      await Datos.borrar(id);
      cargar();
    } catch (error) {
      console.error("Error al borrar el contacto:", error);
    }
  }

  function agregar() {
    setContacto({ nombre: "", apellido: "", telefono: "" });
    setModo("agregar");
  }

  function editar(id) {
    const contactoEditar = contactos.find((c) => c._id === id);
    if (contactoEditar) {
      setContacto(contactoEditar);
      setModo("editar");
    } else {
      console.error("No se encontró el contacto a editar");
    }
  }

  function cancelar() {
    setContacto(null);
    setModo(null);
  }

  return (
    <>
      {modo && (
        <Editar
          contacto={contacto}
          modo={modo}
          alActualizar={actualizar}
          alCancelar={cancelar}
        />
      )}
      {!modo && (
        <Listar
          contactos={contactos}
          alAgregar={agregar}
          alBorrar={borrar}
          alEditar={editar}
        />
      )}
    </>
  );
}

export default App;