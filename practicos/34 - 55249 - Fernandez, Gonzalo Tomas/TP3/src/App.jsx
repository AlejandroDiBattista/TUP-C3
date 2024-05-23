import './App.css';
import { CgAddR } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import initialProducts from './data/initialProducts.js';
import Edit from './components/Edit.jsx';
import Show from './components/Show.jsx';
<<<<<<< HEAD
=======
import NavBar from './components/NavBar.jsx';
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10

function App() {
  // Estados
  const [products, setProducts] = useState(initialProducts); // Llamar mi localStorage
  const [editingProduct, setEditingProduct] = useState(null); // Añadir producto
<<<<<<< HEAD
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
=======
  const [searchTerm, setSearchTerm] = useState(''); // Buscar producto
  const [error, setError] = useState(''); // Controlar errores
  const [theme, setTheme] = useState(() => {
    const themeStorage = window.localStorage.getItem('theme');
    return themeStorage ?? 'dark';
  }); // Cambiar el tema
  
  // Renderizado
  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // Función para añadir producto
  const addProduct = () => {
    setEditingProduct({ id: null, name: '', code: '', count: '', editing: true });
  };

  // Función de NavBar.jsx
  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
  };

  // Funciones de Edit.jsx
  const saveProduct = (product) => {
    const duplicate = products.some(
      (p) => (p.name === product.name || p.code === product.code) && p.id !== product.id
    );
    if (duplicate) {
<<<<<<< HEAD
      setError('Ya existe un producto con el mismo nombre o código EAN.');
=======
      setError('Ya existe un producto con el mismo nombre y código EAN.');
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
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

<<<<<<< HEAD
=======
  const toggleFavorite = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, favorite: !product.favorite } : product
    );
    setProducts(updatedProducts);
  };

  const sortProductsByFavorite = (a, b) => {
    if (a.favorite === b.favorite) {
      return a.name.localeCompare(b.name);
    }
    return b.favorite - a.favorite;
  };

>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
  const updateCount = (productId, newCount) => {
    setProducts(products.map(p => p.id === productId ? { ...p, count: newCount } : p));
  };

  return (
    <>
<<<<<<< HEAD
=======
      <NavBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        setTheme={handleThemeChange}
      />
      <br />
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
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
<<<<<<< HEAD
=======
            .filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort(sortProductsByFavorite)
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
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
<<<<<<< HEAD
=======
                  whenToggleFavorite={() => toggleFavorite(product.id)}
>>>>>>> c0193d821ec4af1f5733e4e2dcfc8bcebd3c7e10
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
