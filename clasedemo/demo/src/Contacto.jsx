const Contacto = ({nombre, apellido, telefono, favorito}) => {
  return (
    <div className="card">
      <span className="favorito">{favorito ? '⭐' : ''}</span>
      <div className="nombre">{nombre} <b>{apellido}</b></div>
      <div className="telefono">{telefono}</div>
    </div>
  );
}

export { Contacto};