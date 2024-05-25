const { useState, useEffect } = React;

const initialProducts = [
  { id: 1, name: '7up', code: '7799876543210', count: 7, editing: false, },
  { id: 2, name: 'Coca Cola', code: '7791234567890', count: 92, editing: false, },
  { id: 3, name: 'Fanta', code: '7793219876540', count: 5, editing: false, },
  { id: 4, name: 'Manaos', code: '7794567891230', count: 1, editing: true, },
  { id: 5, name: 'Mirinda', code: '7797894561230', count: 6, editing: false, },
  { id: 6, name: 'Pepsi Cola', code: '7799876543210', count: 3, editing: true, },
  { id: 7, name: 'Sprite', code: '7796543219870', count: 4, editing: false, },
];

// App.jsx
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
          <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z" fill="currentColor"></path></svg>
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

// Edit.jsx

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
    <form className='panel'>
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

// Show.jsx
 
function Show({ product, whenEdit, whenDelete, updateCount }) {
  const [count, setCount] = useState(product.count);

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
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path><path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path></svg>
            </button>
            <button className="delete-button" onClick={whenDelete}>
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// main.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
