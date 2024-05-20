export function Mostrar({ nombre, inicial, alEditar }) {
  const editar = () => {
    alEditar();
  };
  return (
    <>
      <div className='card'>
        <h2>{nombre} es {inicial}</h2>
        <button onClick={editar}>Editar</button>
      </div>
    </>
  );
}
