const { useState } = React;

const ProductosIniciales = [
    { id: 1, producto: 'Coca-Cola', stock: 100, codigo: '438573845' },
    { id: 2, producto: 'Pepsi', stock: 50, codigo: '456657345' },
    { id: 3, producto: 'Monster', stock: 75, codigo: '87967835' },
    { id: 4, producto: 'Torasso', stock: 200, codigo: '124545634' },
    { id: 5, producto: '7up', stock: 150, codigo: '90966587' }
];

function Editar({ producto, alGuardar, alCancelar }) {
    let [productoNombre, setProductoNombre] = useState(producto.producto);
    let [stock, setStock] = useState(producto.stock);
    let [codigo, setCodigo] = useState(producto.codigo);
    let [error, setError] = useState(false);

    const cambiarProductoNombre = e => {
        setProductoNombre(e.target.value);
        setError(false);
    };
    const cambiarStock = e => {
        setStock(e.target.value);
        setError(false);
    };
    const cambiarCodigo = e => {
        setCodigo(e.target.value);
        setError(false);
    };

    const guardar = e => {
        e.preventDefault();
        if (productoNombre.trim() === '' || stock === '' || codigo.trim() === '') {
            setError(true);
            return;
        }
        alGuardar({ ...producto, producto: productoNombre, stock, codigo });
    };
    const cancelar = e => {
        e.preventDefault();
        alCancelar();
    };
    return (
        <>
            <form className="panel">
                <label>Producto</label>
                <input type="text" value={productoNombre} onChange={cambiarProductoNombre} />

                <label>Stock</label>
                <input type="number" value={stock} onChange={cambiarStock} />

                <label>Código</label>
                <input type="text" value={codigo} onChange={cambiarCodigo} />
                {error && <p className="error">TODOS LOS CAMPOS SON OBLIGATORIOS</p>}
                <div className="acciones">
                    <button onClick={guardar}>Guardar</button>
                    <button onClick={cancelar}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

function Agregar({ alGuardar, alCancelar }) {
    let [productoNombre, setProductoNombre] = useState('');
    let [stock, setStock] = useState('');
    let [codigo, setCodigo] = useState('');
    let [error, setError] = useState(false);

    const cambiarProductoNombre = e => {
        setProductoNombre(e.target.value);
        setError(false);
    };
    const cambiarStock = e => {
        setStock(e.target.value);
        setError(false);
    };
    const cambiarCodigo = e => {
        setCodigo(e.target.value);
        setError(false);
    };

    const guardar = e => {
        e.preventDefault();
        if (productoNombre.trim() === '' || stock === '' || codigo.trim() === '') {
            setError(true);
            return;
        }
        alGuardar({ producto: productoNombre, stock: parseInt(stock), codigo });
        setProductoNombre('');
        setStock('');
        setCodigo('');
    };
    const cancelar = e => {
        e.preventDefault();
        alCancelar();
    };
    return (
        <>
            <form className="panel">
                <label>Producto</label>
                <input type="text" value={productoNombre} onChange={cambiarProductoNombre} />

                <label>Stock</label>
                <input type="number" value={stock} onChange={cambiarStock} />

                <label>Código</label>
                <input type="text" value={codigo} onChange={cambiarCodigo} />
                {error && <p className="error">TODOS LOS CAMPOS SON OBLIGATORIOS</p>}
                <div className="acciones">
                    <button onClick={guardar}>Guardar</button>
                    <button onClick={cancelar}>Cancelar</button>
                </div>
            </form>
        </>
    );
}

function Mostrar({ producto, alEditar, alBorrar }) {
    return (
        <div className="producto">
            <div className="stock">{producto.stock}</div>
            <div className="detalles">
                <p className="nombre">{producto.producto}</p>
                <p>{producto.codigo}</p>
            </div>
            <div className="acciones">
                <button onClick={alEditar}><i className="fa-regular fa-pen-to-square"></i></button>
                <button onClick={alBorrar}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
    );
}

function Inventario({ productos, productoEditando, alAgregar, alEditar, alGuardar, alCancelar, alBorrar }) {
    if (productos.length === 0)
        return <h1>No hay productos</h1>;

    return (
        <>
            <h1>Control Depósito</h1>
            <button onClick={() => alAgregar()}><i className="fas fa-plus"></i></button>
            {productos.map(producto =>
                productoEditando && productoEditando.id === producto.id
                    ? <Editar key={producto.id} producto={productoEditando} alGuardar={alGuardar} alCancelar={alCancelar} />
                    : <Mostrar key={producto.id} producto={producto}
                        alEditar={() => alEditar(producto.id)}
                        alBorrar={() => alBorrar(producto.id)}
                    />
            )}
        </>
    );
}

function ordenAlfabetico(a, b) {
    if (a.producto < b.producto) return -1;
    if (a.producto > b.producto) return +1;
    return 0;
}

function App() {
    let [productoEditando, setProductoEditando] = useState(null);
    let [productos, setProductos] = useState(ProductosIniciales);

    const guardar = (producto) => {
        if (producto.id) {
            let copia = productos.map(c => c.id === producto.id ? producto : c);
            setProductos(copia);
        } else {
            let id = Math.max(...productos.map(c => c.id)) + 1;
            let copia = [...productos, { ...producto, id }];
            setProductos(copia);
        }
        setProductoEditando(null);
    };

    const cancelar = () => {
        setProductoEditando(null);
    };

    function Inventario({ productos, estaAgregando, productoEditando, alAgregar, alEditar, alGuardar, alCancelar, alBorrar }) {
        if (productos.length === 0)
            return <h1>No hay productos</h1>;
    
        return (
            <>
                <h1>Control Depósito</h1>
                <button onClick={() => alAgregar()}><i className="fas fa-plus"></i></button>
                {estaAgregando ? (
                    <Agregar alGuardar={alGuardar} alCancelar={alCancelar} />
                ) : (
                    productos.map(producto =>
                        productoEditando && productoEditando.id === producto.id
                            ? <Editar key={producto.id} producto={productoEditando} alGuardar={alGuardar} alCancelar={alCancelar} />
                            : <Mostrar key={producto.id} producto={producto}
                                alEditar={() => alEditar(producto.id)}
                                alBorrar={() => alBorrar(producto.id)}
                            />
                    )
                )}
            </>
        );
    }
    
    function App() {
        let [estaAgregando, setEstaAgregando] = useState(false);
        let [productoEditando, setProductoEditando] = useState(null);
        let [productos, setProductos] = useState(ProductosIniciales);
    
        const guardar = (producto) => {
            if (producto.id) {
                let copia = productos.map(c => c.id === producto.id ? producto : c);
                setProductos(copia);
            } else {
                let id = Math.max(...productos.map(c => c.id)) + 1;
                let copia = [...productos, { ...producto, id }];
                setProductos(copia);
            }
            setEstaAgregando(false);
            setProductoEditando(null);
        };
    
        const cancelar = () => {
            setEstaAgregando(false);
            setProductoEditando(null);
        };
    
        const agregar = () => {
            setEstaAgregando(true);
            setProductoEditando(null); 
        };
    
        const editar = (id) => {
            let producto = productos.find(c => c.id === id);
            setProductoEditando(producto);
            setEstaAgregando(false); 
        };
    
        const borrar = (id) => {
            let copia = productos.filter(c => c.id !== id);
            setProductos(copia);
        };
    
        productos.sort(ordenAlfabetico);
    
        return (
            <Inventario
                productos={productos}
                estaAgregando={estaAgregando}
                productoEditando={productoEditando}
                alAgregar={agregar}
                alEditar={editar}
                alGuardar={guardar}
                alCancelar={cancelar}
                alBorrar={borrar}
            />
        );
    }
    
    ReactDOM.render(<App />, document.getElementById('root'));
    

    const borrar = (id) => {
        let copia = productos.filter(c => c.id !== id);
        setProductos(copia);
    };

    productos.sort(ordenAlfabetico);

    return (
        <Inventario
            productos={productos}
            productoEditando={productoEditando}
            alAgregar={agregar}
            alEditar={editar}
            alGuardar={guardar}
            alCancelar={cancelar}
            alBorrar={borrar}
        />
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
