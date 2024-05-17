// App.jsx

import './App.css';
import { CgAddR } from 'react-icons/cg';
import { useState } from 'react';
import initialProducts from './data/initialProducts';
import Edit from './components/Edit';
import Show from './components/Show';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);

  const saveProduct = (product) => {
    if (products.length >= 30 && !product.id) {
      setError('No se pueden agregar más de 30 productos.');
      return;
    }
    if (product.count > 100) {
      setError('La cantidad de unidades no puede ser mayor a 100.');
      return;
    }
    setError(null);

    if (product.id) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      product.id = products.length ? products[products.length - 1].id + 1 : 1;
      setProducts([...products, product]);
    }
    setEditingProduct(null);
  };

  const deleteProduct = (product) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );
  };

  const addProduct = () => {
    setEditingProduct({ name: '', code: '', count: '' });
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  return (
    <>
      <h1 className="title">
        Control Depósito
        <button className="buttonTitle" onClick={addProduct}>
          <CgAddR />
        </button>
      </h1>

      <div>
        {editingProduct && !editingProduct.id && (
          <Edit
            product={editingProduct}
            whenSave={saveProduct}
            whenCancel={() => setEditingProduct(null)}
            error={error}
          />
        )}
        {products
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product) =>
            editingProduct && editingProduct.id === product.id ? (
              <Edit
                key={product.id}
                product={editingProduct}
                whenSave={saveProduct}
                whenCancel={() => setEditingProduct(null)}
                error={error}
              />
            ) : (
              <Show
                key={product.id}
                product={product}
                whenEdit={() => editProduct(product)}
                whenDelete={() => deleteProduct(product)}
              />
            )
          )}
      </div>
      <footer>
        <p>@Gonzalo Tomas Fernandez</p>
      </footer>
    </>
  );
}

export default App;
