
import React from "react";

function Listar({ contactos, alAgregar, alBorrar, alEditar }) {
  return (
    <>
      <div className="arriba">
        <h2>
          Contactos
          <button className="btnarriba" onClick={alAgregar}>
            Agregar
          </button>
        </h2>
      </div>
      {contactos.map((c) => (
        <section key={c._id} className="card">
          <h4>
            {c.nombre} <b>{c.apellido}</b>
          </h4>
          <p>{c.telefono}</p>
          <div className="actions">
            <button className="btnnnn" onClick={() => alBorrar(c._id)}>Borrar</button>
            <button className="btnnnn"onClick={() => alEditar(c._id)}>Editar</button>
          </div>
        </section>
      ))}
    </>
  );
}

export default Listar;



