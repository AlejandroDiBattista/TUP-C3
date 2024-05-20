import { useState } from 'react';

export function useCounter(inicial=0) {
  const [count, setCount] = useState(inicial);

  const incrementar = () => {
    if (count >= 10) return;
    return setCount((count) => count + 1);
  }
  const decrementar = () => {
    if (count <= 0) return;
    return setCount((count) => count - 1);
  }

  return [count, incrementar, decrementar];
}
