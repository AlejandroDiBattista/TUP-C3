const { useState } = React;

function Producto({ producto, alGuardar, alBorrar, alCancelar }) {
    const [editando, setEditando] = useState(producto.id ? false : true);
    const [nombre, setNombre] = useState(producto.nombre || '');
    const [codEAN, setCodEAN] = useState(producto.codEAN || '');
    const [cantidad, setCantidad] = useState(producto.cantidad || 0);
    const [error, setError] = useState(false);

    const cambiarNombre = e => {
        setNombre(e.target.value);
        setError(false);
    };

    const cambiarCodEAN = e => {
        setCodEAN(e.target.value);
        setError(false);
    };

    const cambiarCantidad = e => {
        setCantidad(e.target.value);
        setError(false);
    };

    const guardar = e => {
        e.preventDefault();
        if (nombre.trim() === '' || codEAN.trim() === '' || cantidad <= 0) {
            setError(true);
            return;
        }
        alGuardar({ ...producto, nombre, codEAN, cantidad: parseInt(cantidad) });
        setEditando(false);
    };
    
    const cancelar = e => {
        e.preventDefault();
        if (producto.id) {
            setEditando(false);
        } else {
            alCancelar();
        }
    };

    const editar = () => setEditando(true);
    const borrar = () => alBorrar(producto.id);

    const handleClick = () => {
        if (!editando) {
            setCantidad(prevCantidad => parseInt(prevCantidad) + 1);
        }
    };    

    return (
        <div className="panel" onClick={handleClick}>
            {editando || producto.id === null ? (
                <>
                    <div className="cantidad">{cantidad}</div>
                    <div className="stock-info">
                        <div className="edit-inputs">
                            <input type="text" value={nombre} onChange={cambiarNombre} placeholder="Nombre Producto" />
                            <input type="text" value={codEAN} onChange={cambiarCodEAN} placeholder="Codigo - Ean" />
                            <input type="number" value={cantidad} onChange={cambiarCantidad} placeholder="Cantidad Nº" />
                        </div>
                    </div>
                    {error && <p className="error">Debes llenar todos los campos </p>}
                    <div className="acciones">
                        <button onClick={guardar}>Guardar</button>
                        <button onClick={cancelar}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="cantidad">{cantidad}</div>
                    <div className="stock-info">
                        <p className="nombre-ProdDisponibles">{nombre}</p>
                        <p className="codigoEAN">{codEAN}</p>
                    </div>
                    <div className="acciones">
                        <div className="icon" onClick={editar}><i className="fa-solid fa-file-pen"></i></div>
                        <div className="icon" onClick={borrar}><i className="fa-solid fa-circle-minus"></i></div>
                    </div>
                </>
            )}
        </div>
    );
}

function App() {
    const [ProdDisponibles, setProdDisponibles] = useState(StockDisponible);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState(null);

    const agregarNuevo = () => {
        setNuevoProducto({ id: null, nombre: '', codEAN: '', cantidad: 0 });
        setMostrarFormulario(true);
    };

    const cancelarAgregarNuevo = () => {
        setNuevoProducto(null);
        setMostrarFormulario(false);
    };

    const guardar = (producto) => {
        let copia;
        if (producto.id) {
            copia = ProdDisponibles.map(p => p.id === producto.id ? producto : p);
        } else {
            const id = Math.max(...ProdDisponibles.map(p => p.id), 0) + 1;
            copia = [...ProdDisponibles, { ...producto, id }];
        }
        copia.sort(OrdenarAlfab);
        setProdDisponibles(copia);
        setMostrarFormulario(false);
    };

    const borrar = (id) => {
        const copia = ProdDisponibles.filter(p => p.id !== id);
        copia.sort(OrdenarAlfab);
        setProdDisponibles(copia);
    };

    ProdDisponibles.sort(OrdenarAlfab);

    return (
        <>
            <h1>Depósito</h1>
            <div className="acciones" style={{ justifyContent: 'center', marginBottom: '22px' }}>
                {mostrarFormulario ? (
                    <Producto
                        producto={nuevoProducto}
                        alGuardar={guardar}
                        alBorrar={borrar}
                        alCancelar={cancelarAgregarNuevo}
                    />
                ) : (
                    <button onClick={agregarNuevo}>+</button>
                )}
            </div>
            {ProdDisponibles.map(producto => (
                <Producto
                    key={producto.id}
                    producto={producto}
                    alGuardar={guardar}
                    alBorrar={borrar}
                />
            ))}
        </>
    );
}
    // Para hacer orden alfb. ( funcion ordenar 2da)
function OrdenarAlfab(a1, b1) {
    if (a1.nombre < b1.nombre) return -1;
    if (a1.nombre > b1.nombre) return 1;
    return 0;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
