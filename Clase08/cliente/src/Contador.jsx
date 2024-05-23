import { useCounter } from './useCounter';

function Contador({ nombre, inicial = 0 }) {
  let [count, incrementar, decrementar] = useCounter(inicial);
  return (
    <>
      <div className='card'>

      <h2>{nombre} es {count}</h2>
      <button onClick={incrementar}>+1</button>
      <button onClick={decrementar}>-1</button>
      </div>
    </>
  );
}

export { Contador };