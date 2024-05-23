const { useState } = React;

function Producto({ producto, alGuardar, alBorrar }) {
    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState(producto.nombre);
    const [codEAN, setcodEAN] = useState(producto.codEAN);
    const [cantidad, setCantidad] = useState(producto.cantidad);
    const [error, setError] = useState(false);

    const cambiarNombre = e => {
        setNombre(e.target.value);
        setError(false);
    };

    const cambiarcodEAN = e => {
        setcodEAN(e.target.value);
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
        alGuardar({ ...producto, nombre, codEAN, cantidad });
        setEditando(false);
    };

    const cancelar = e => {
        e.preventDefault();
        setEditando(false);
    };

    const editar = () => setEditando(true);
    const borrar = () => alBorrar(producto.id);

    const handleClick = (e) => {
        if (!editando && e.currentTarget === e.target) {
            setCantidad(cantidad + 1);
        }
    };

    return (
        <div className="panel" onClick={handleClick}>
            {editando ? (
                <>
                    <div className="edit-inputs">
                        <input type="text" value={nombre} onChange={cambiarNombre} placeholder="Nombre Producto" />
                        <input type="text" value={codEAN} onChange={cambiarcodEAN} placeholder="Codigo - Ean" />
                        <input type="number" value={cantidad} onChange={cambiarCantidad} placeholder="Cantidad Nº" />
                    </div>
                    {error && <p className="error">Debes llenar todos los campos ProdDisponibles</p>}
                    <div className="acciones">
                        <button onClick={guardar}>Guardar</button>
                        <button onClick={cancelar}>Cancelar</button>
                    </div>
                </>
            ) : (
                <>
                    <div className="cantidad">{cantidad}</div>
                    <div className="stock-info" onClick={handleClick}>
                        <p className="nombre-ProdDisponibles">{producto.nombre}</p>
                        <p className="codigoEAN">{producto.codEAN}</p>
                    </div>
                    <div className="acciones">
                        <div className="icon" onClick={editar}><i class="fa-solid fa-file-pen"></i></div>
                        <div className="icon" onClick={borrar}><i class="fa-solid fa-circle-minus"></i></div>
                    </div>
                </>
            )}
        </div>
);
}

function Inventario({ ProdDisponibles, alAgregar, alGuardar, alBorrar }) {
    return (
        <>
            <h1>Depósito ( Control de Inventario )</h1>
            <div className="acciones" style={{ justifyContent: 'center', marginBottom: '22px' }}>
                <button onClick={() => alAgregar()}>&#43;</button>
            </div>
            {ProdDisponibles.map(producto => (
                <Producto
                    key={producto.id}
                    producto={producto}
                    alGuardar={alGuardar}
                    alBorrar={alBorrar}
                />
            ))}
        </>
    );
}


function App() {
    const [ProdDisponibles, setProdDisponibles] = useState(StockDisponible);

    const agregar = () => {
        const id = Math.max(...ProdDisponibles.map(p => p.id)) + 1;
        const nuevoProducto = { id, nombre: '', codEAN: '', cantidad: 0 };
        setProdDisponibles([...ProdDisponibles, nuevoProducto]);
    };

    const guardar = (producto) => {
        if (producto.id) {
            // Editar un producto  ( Modificar )
            const copia = ProdDisponibles.map(p => p.id === producto.id ? producto : p);
            setProdDisponibles(copia);
        } else {
            // Agregar ( Producto "Alta" )
            const id = Math.max(...ProdDisponibles.map(p => p.id)) + 1;
            const copia = [...ProdDisponibles, { ...producto, id }];
            setProdDisponibles(copia);
        }
    };

    const borrar = (id) => {
        // Quitar de la Lista (Baja Producto)
        const copia = ProdDisponibles.filter(p => p.id !== id);
        setProdDisponibles(copia);
    };

    ProdDisponibles.sort(OrdenarAlfab);
    return (
        <Inventario
            ProdDisponibles={ProdDisponibles}
            alAgregar={agregar}
            alGuardar={guardar}
            alBorrar={borrar}
        />
    );
}

/// Ordenar Items alfabeticamente
function OrdenarAlfab(a1, b1) {
    if (a1.nombre < b1.nombre) return -1;
    if (a1.nombre > b1.nombre) return +1;
    return 0;
}

function Agenda({ ProdDisponibles, alAgregar, alGuardar, alBorrar, incrementarStock }) {
    return (
        <>
            {ProdDisponibles.map(producto => (
                <Mostrar
                    key={producto.codigo}
                    producto={producto}
                    alGuardar={alGuardar}
                    alBorrar={alBorrar}
                    incrementarStock={incrementarStock}
                />
            ))}
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);