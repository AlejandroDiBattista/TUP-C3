const { createRoot } = ReactDOM;
const { useState } = React;

const ProductosIniciales = [
    {
        id: 1,
        nombreProducto: 'Pepsi',
        stock: '2',
        codigo: '123456789'
    },
    {
        id: 2,
        nombreProducto: 'Coca',
        stock: '4',
        codigo: '123456798'
    },
    {
        id: 3,
        nombreProducto: 'Manaos',
        stock: '16',
        codigo: '123456987'
    }
];

const EditarDatos = ({ producto, alGuardar, alCancelar }) => {
    let [nombreProducto, setNombreProducto] = useState(producto.nombreProducto);
    let [stock, setStock] = useState(producto.stock);
    let [codigo, setCodigo] = useState(producto.codigo);
    let [error, setError] = useState(false);

    const cambiarNombreProducto = (e) => {
        setNombreProducto(e.target.value);
        setError(false);
    }

    const cambiarStock = (e) => {
        setStock(e.target.value);
        setError(false);
    }

    const cambiarCodigo = (e) => {
        setCodigo(e.target.value);
        setError(false);
    }
    const Guardar = (e) => {
        e.preventDefault();
        if (nombreProducto.trim() === "" || stock.trim() === "" || codigo.trim() === "") {
            setError(true);
            return;
        }
        alGuardar({ id: producto.id, nombreProducto, stock, codigo });
    }
    const Cancelar = (e) => {
        e.preventDefault();
        alCancelar();
    }

    return (
        <form className="form">
            <div className="form-seccion1">
                    <input type="text" placeholder="PRODUCTO" value={nombreProducto} onChange={cambiarNombreProducto} className="input-form"/>
                    <input type="text" placeholder="STOCK" value={stock} onChange={cambiarStock} className="input-form"/>
                    <input type="text" placeholder="CÓDIGO" value={codigo} onChange={cambiarCodigo} className="input-form"/>
                {error && <p className="error">Todos los campos son obligatorios</p>}
            </div>
            <div className="form-seccion2">
                <button onClick={Guardar} className="buttonAceptar">Aceptar</button>
                <button onClick={Cancelar} className="buttonCancelar">Cancelar</button>
            </div>
        </form>
    );
}

const Mostrar = ({ producto, alEditar, alBorrar }) => {
    const editar = (e) => alEditar();
    const borrar = (e) => alBorrar();

    return (
        <div className="panel">
            <div className="panel-seccion-uno">
                <p className="p-stock">{producto.stock}</p>
            </div>
            <div className="panel-seccion-dos">
                <p className="p-nombre">{producto.nombreProducto}</p>
                <p className="p-codigo">{producto.codigo}</p>
            </div>
            <div className="acciones">
                <span className="spanEditar" onClick={editar}><i className="fa-regular fa-pen-to-square fa-2x"></i></span>
                <span className="spanBorrar" onClick={borrar}><i class="fa-regular fa-trash-can fa-2x"></i></span>
            </div>
        </div>
    )
}
const ListaProductos = ({ productos, productoEditando, alAgregar, alEditar, alGuardar, alCancelar, alBorrar }) => {
    return (
        <div className="Lista-productos">
            <div className="titulo-boton">
                <h1 className="h1-deposito">Control Depósito</h1>
                <span className="spanAgregar" onClick={() => alAgregar()}><i className="fa-regular fa-plus-square fa-2x botonAgregar"></i></span>
            </div>
            {productos.map(producto => (
                productoEditando && productoEditando.id === producto.id
                    ? <EditarDatos key={producto.id} producto={productoEditando} alGuardar={alGuardar} alCancelar={alCancelar} />
                    : <Mostrar key={producto.id} producto={producto} alEditar={() => alEditar(producto.id)} alBorrar={() => alBorrar(producto.id)} />
            ))}
            {productoEditando && !productoEditando.id && <EditarDatos key="new" producto={productoEditando} alGuardar={alGuardar} alCancelar={alCancelar} />}
        </div>
    )
}


const App = () => {
    let [productoEditando, setProductoEditando] = useState(null);
    let [productos, setProductos] = useState(ProductosIniciales);

    const Guardar = (producto) => {
        if (producto.id) {
            let copia = productos.map(c => c.id === producto.id ? producto : c);
            setProductos(copia);
        } else {
            let id = Math.max(...productos.map(c => c.id)) + 1;
            producto.id = id;
            let copia = [...productos, producto];
            setProductos(copia);
        }
        setProductoEditando(null);
    }

    const Cancelar = () => {
        setProductoEditando(null);
    }

    const Agregar = () => {
        setProductoEditando({});
    }

    const Editar = (id) => {
        let producto = productos.find(c => c.id === id);
        setProductoEditando(producto);
    }

    const Borrar = (id) => {
        let copia = productos.filter(c => c.id !== id);
        setProductos(copia);
    }

    return (
        <ListaProductos
            productos={productos}
            productoEditando={productoEditando}
            alAgregar={Agregar}
            alEditar={Editar}
            alGuardar={Guardar}
            alCancelar={Cancelar}
            alBorrar={Borrar}
        />
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);