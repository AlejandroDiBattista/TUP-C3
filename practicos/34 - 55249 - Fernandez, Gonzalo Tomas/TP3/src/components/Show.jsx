// Show.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Show.css';
import { BiEdit } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi';
<<<<<<< HEAD

function Show({ product, whenEdit, whenDelete, updateCount }) {
  const [count, setCount] = useState(product.count);
=======
import { FaStar, FaRegStar } from 'react-icons/fa';

function Show({ product, whenEdit, whenDelete, whenToggleFavorite, updateCount }) {
  const [count, setCount] = useState(product.count);
  const [successMessage, setSuccessMessage] = useState('');
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10

  const getCountAlignmentClass = () => {
    return count >= 10 || count >= 100 ? 'product-count align-right' : 'product-count';
  };

  const getDetailsAlignmentClass = () => {
    return count >= 10 || count >= 100 ? 'product-details align-right' : 'product-details';
  };

  const incrementCount = () => {
    const newCount = Math.min(count + 1, 100);
    setCount(newCount);
    updateCount(product.id, newCount);
<<<<<<< HEAD
=======

    setSuccessMessage('Producto modificado');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
  };

  return (
    <div className="container">
      <div className="panel">
        <div className="product-info">
          <h1 className={getCountAlignmentClass()} onClick={incrementCount}>
            {count}
          </h1>
          <div className={getDetailsAlignmentClass()}>
            <div className="product-name">{product.name}</div>
            <p className="product-code">{product.code}</p>
          </div>
          <div className="button-product">
            <button className="edit-button" onClick={whenEdit}>
              <BiEdit />
            </button>
<<<<<<< HEAD
=======
            <button className="favorite-button" onClick={whenToggleFavorite}>
              {product.favorite ? <FaStar /> : <FaRegStar />}
            </button>
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
            <button className="delete-button" onClick={whenDelete}>
              <FiTrash />
            </button>
          </div>
        </div>
<<<<<<< HEAD
=======
        {successMessage && <div className="success">{successMessage}</div>}
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
      </div>
    </div>
  );
}

Show.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
<<<<<<< HEAD
=======
    favorite: PropTypes.bool.isRequired,
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
    editing: PropTypes.bool,
  }).isRequired,
  whenEdit: PropTypes.func.isRequired,
  whenDelete: PropTypes.func.isRequired,
<<<<<<< HEAD
=======
  whenToggleFavorite: PropTypes.func.isRequired,
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
  updateCount: PropTypes.func.isRequired,
};

export default Show;
