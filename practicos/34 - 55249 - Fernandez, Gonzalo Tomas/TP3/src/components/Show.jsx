import { useState } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/Show.css';
import { BiEdit } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi';

function Show({ product, whenEdit, whenDelete }) {
  const [count, setCount] = useState(product.count);

  const getCountAlignmentClass = () => {
    return count >= 10 || count >= 100
      ? 'product-count align-right'
      : 'product-count';
  };

  const getDetailsAlignmentClass = () => {
    return product.count >= 10 || product.count >= 100
      ? 'product-details align-right'
      : 'product-details';
  };

  const incrementCount = () => {
    setCount(Math.min(count + 1, 100));
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
        </div>
        <div>
          <button className="edit-button" onClick={whenEdit}>
            <BiEdit />
          </button>
          <button className="delete-button" onClick={whenDelete}>
            <FiTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

Show.propTypes = {
  product: PropTypes.shape({
    count: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  whenEdit: PropTypes.func.isRequired,
  whenDelete: PropTypes.func.isRequired,
};

export default Show;
