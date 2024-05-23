import './App.css';
import { CgAddR } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import initialProducts from './data/initialProducts.js';
import Edit from './components/Edit.jsx';
import Show from './components/Show.jsx';

function App() {
  // Estados
  const [products, setProducts] = useState(initialProducts); // Llamar mi localStorage
  const [editingProduct, setEditingProduct] = useState(null); // Añadir producto
  const [error, setError] = useState(''); // Controlar errores

  useEffect(() => {
    if (error || setError) {
      const timeout = setTimeout(() => {
        setError('');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error, setError]);

  // Función para añadir producto
  const addProduct = () => {
    setEditingProduct({ id: null, name: '', code: '', count: '' });
  };

  // Funciones de Edit.jsx
  const saveProduct = (product) => {
    const duplicate = products.some(
      (p) => (p.name === product.name || p.code === product.code) && p.id !== product.id
    );
    if (duplicate) {
      setError('Ya existe un producto con el mismo nombre o código EAN.');
      return;
    }

    if (products.length >= 30 && !product.id) {
      setError('No se pueden agregar más de 30 productos.');
      return;
    }

    setError('');

    if (product.id) {
      product.editing = false;
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      const nextId = products.reduce((maxId, p) => Math.max(maxId, p.id), 0) + 1;
      product.id = nextId;
      product.editing = false;
      product.favorite = false;
      setProducts([...products, product]);
    }

    setEditingProduct(null);
  };

  const cancelProduct = (product) => {
    if (product.id) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? { ...product, editing: false } : p))
      );
    } else {
      setEditingProduct(null);
    }
  };

  // Funciones de Show.jsx
  const editProduct = (product) => {
    let copie = [...products];
    let index = copie.findIndex((p) => p.id === product.id);
    copie[index].editing = true;
    setProducts(copie);
  };

  const deleteProduct = (product) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );
  };

  const updateCount = (productId, newCount) => {
    setProducts(products.map(p => p.id === productId ? { ...p, count: newCount } : p));
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
        {editingProduct && (
          <Edit
            product={editingProduct}
            whenSave={saveProduct}
            whenCancel={() => cancelProduct(editingProduct)}
            error={error}
            products={products}
          />
        )}
        {products.length === 0 ? (
          <div className='nothing'>
            <p>Ya no hay productos existentes.</p>
          </div>
        ) : (
          products
            .map((product) =>
              product.editing ? (
                <Edit
                  key={product.id}
                  product={product}
                  whenSave={saveProduct}
                  whenCancel={() => cancelProduct(product)}
                  error={error}
                  products={products}
                />
              ) : (
                <Show
                  key={product.id}
                  product={product}
                  whenEdit={() => editProduct(product)}
                  whenDelete={() => deleteProduct(product)}
                  updateCount={updateCount}
                />
              )
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
