import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../stylesheets/Edit.css';

function Edit({ product, whenSave, whenCancel, error, products }) {
  const [name, setName] = useState(product.name || '');
  const [code, setCode] = useState(product.code || '');
  const [count, setCount] = useState(product.count || '');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    setName(product.name || '');
    setCode(product.code || '');
    setCount(product.count || '');
  }, [product]);

  useEffect(() => {
    if (error || localError) {
      const timeout = setTimeout(() => {
        setLocalError('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, localError]);

  const done = (e) => {
    e.preventDefault();

    const noChanges =
      name === product.name &&
      code === product.code &&
      count.toString() === product.count.toString();

    if (!noChanges) {
      const duplicate = products.some((p) => {
        return p.id !== product.id && (p.name === name || p.code === code);
      });

      if (duplicate) {
        setLocalError('Ya existe un producto con el mismo nombre o código EAN.');
        return;
      }
    }

    if (name === '' || code === '' || count === '') {
      setLocalError('Todos los campos son obligatorios.');
      return;
    }

    if (code.length !== 13) {
      setLocalError('El código EAN debe tener exactamente 13 caracteres.');
      return;
    }

    const parsedCount = parseInt(count, 10);
    if (isNaN(parsedCount) || parsedCount < 0 || parsedCount > 100) {
      setLocalError('La cantidad de unidades debe estar entre 0 y 100.');
      return;
    }

    setLocalError('');
    whenSave({ ...product, name, code, count: parsedCount });
  };

  const cancel = (e) => {
    e.preventDefault();
    whenCancel();
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        minLength={5}
        maxLength={12}
      />
      <input
        type="text"
        placeholder="Código EAN"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        minLength={13}
        maxLength={13}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        min="0"
        max="100"
      />
      <div className="actions">
        <button onClick={done}>Aceptar</button>
        <button onClick={cancel}>Cancelar</button>
      </div>
      {(error || localError) && (
        <div className="error">{error || localError}</div>
      )}
    </form>
  );
}

Edit.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  whenSave: PropTypes.func.isRequired,
  whenCancel: PropTypes.func.isRequired,
  error: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
};

export default Edit;
