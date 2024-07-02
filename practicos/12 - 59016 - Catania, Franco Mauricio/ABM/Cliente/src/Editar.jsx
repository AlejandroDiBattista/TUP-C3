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
    <section className="card1">
      <h2>{modo === "editar" ? "Editar Contacto" : "Agregar Contacto"}</h2>
      <form className="fomu">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={datos.nombre || ""}
            onChange={cambiar}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={datos.apellido || ""}
            onChange={cambiar}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={datos.telefono || ""}
            onChange={cambiar}
          />
        </label>
        <div className="llll">
          <button onClick={guardar}>Guardar</button>
          <button onClick={alCancelar}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}

export default Editar;
