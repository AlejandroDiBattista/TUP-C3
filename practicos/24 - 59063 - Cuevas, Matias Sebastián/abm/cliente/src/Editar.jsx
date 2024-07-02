import React, { useState, useEffect } from "react";

function Editar({ contacto, modo, alActualizar, alCancelar }) {
  const [datos, setDatos] = useState({ ...contacto });

  useEffect(() => {
    setDatos({ ...contacto });
  }, [contacto]);

  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  async function guardar(e) {
    e.preventDefault();

    try {
      await alActualizar(datos);
      alert(
        `¡Contacto ${
          modo === "editar" ? "actualizado" : "agregado"
        } correctamente!`
      );
    } catch (error) {
      console.error(
        `Error al ${modo === "editar" ? "actualizar" : "agregar"} el contacto:`,
        error
      );
      alert(
        `Hubo un error al ${
          modo === "editar" ? "actualizar" : "agregar"
        } el contacto. Por favor, intenta de nuevo más tarde.`
      );
    }
  }

  return (
    <section className="card">
    <h2>{modo === "editar" ? "Editar Contacto" : "Agregar Contacto"}</h2>
    <form className="fomu">
      <label className="form-label">
        Nombre:
        <input
          type="text"
          name="nombre"
          value={datos.nombre || ""}
          onChange={cambiar}
      className="form-input"
        />
      </label>
      <label className="form-label">
        Apellido:
        <input
          type="text"
          name="apellido"
          value={datos.apellido || ""}
          onChange={cambiar}
         className="form-input"
        />
      </label>
      <label className="form-label">
        Teléfono:
        <input
          type="text"
          name="telefono"
          value={datos.telefono || ""}
          onChange={cambiar}
          className="form-input"
        />
      </label>
      <div className="">
        <button type="button" onClick={guardar}>Guardar</button>
        <button type="button" onClick={alCancelar}>Cancelar</button>
      </div>
    </form>
  </section>
  );
}

export default Editar;