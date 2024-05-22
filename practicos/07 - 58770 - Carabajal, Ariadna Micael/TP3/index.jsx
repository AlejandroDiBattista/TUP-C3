const { useState } = React

const productosIniciales = [
    { ean: 7797152380649, nombre: "Barniz", cantidad: 72},
    { ean: 7796094137528, nombre: "Pizarra Blanca", cantidad: 28},
    { ean: 7796049215378, nombre: "Cinta Empaque", cantidad: 27},
    { ean: 7796384571290, nombre: "Pintura Acrilica", cantidad: 45},
    { ean: 7794179263058, nombre: "Bolígrafo Filgo", cantidad: 33},
    { ean: 7794081329576, nombre: "Bolígrafo Bic", cantidad: 99},
    { ean: 7797912084365, nombre: "Barra Silicona", cantidad: 23},
    { ean: 7799675208341, nombre: "Goma eva lisa", cantidad: 45},
    { ean: 7792394856107, nombre: "Resaltador", cantidad: 66},
    { ean: 7795206748913, nombre: "Corrector Filgo", cantidad: 67},
    { ean: 7797843051296, nombre: "Abrochadora Mapped", cantidad: 9},
    { ean: 7792594168037, nombre: "Carpeta Fibra", cantidad: 21},
    { ean: 7799258316407, nombre: "Cuaderno Avon", cantidad: 10},
    { ean: 7798350974261, nombre: "Impresora", cantidad: 15},
    { ean: 7795062473198, nombre: "Cuaderno ABC", cantidad: 24},
    { ean: 7793579428106, nombre: "Marcador", cantidad: 56},
    { ean: 7796214308579, nombre: "Acuarelas x6", cantidad: 87},
    { ean: 7792165738490, nombre: "Folios", cantidad: 23},
    { ean: 7797932614850, nombre: "Plastilina", cantidad: 34},
    { ean: 7791239740658, nombre: "Tijeras", cantidad: 56},
    { ean: 7792843051796, nombre: "Reglas", cantidad: 78},
    { ean: 7791380549627, nombre: "Compaces", cantidad: 89},
    { ean: 7790521867493, nombre: "Minas", cantidad: 97},
    { ean: 7795760384192, nombre: "Microfibras", cantidad: 23},
    { ean: 7797821405369, nombre: "Tizas", cantidad: 4},
    { ean: 7793418605927, nombre: "Telgopor", cantidad: 80},
    { ean: 7791967403285, nombre: "Crayones", cantidad: 43},
    { ean: 7792684590713, nombre: "Sacapuntas", cantidad: 69},
    { ean: 7799253147860, nombre: "Separadores", cantidad: 88},
    { ean: 7795680249173, nombre: "Pinceles", cantidad: 22}
]

function Editar({producto, alAceptar ,alCancelar}){
    let [nombre, setNombre] = useState(producto.nombre)
    let [ean, setEan] = useState(producto.ean)
    let [cantidad, setCantidad] = useState(producto.cantidad)
    let [error, setError] = useState(false)

    const cambiarNombre = (e) => {setNombre(e.target.value), setError(false)} 
    const cambiarEan = (e) => {setEan(e.target.value), setError(false)}
    const cambiarCantidad = (e) => {setCantidad(e.target.value), setError(false)}

    const aceptar = (e) => {
        e.preventDefault()
        if (nombre.trim() === '' || ean === '' || cantidad === '') {
            setError(true)
            return
        }else if(cantidad > 99){
            setError(true)
            return
        }else if(ean.length > 13 || ean.length < 13){
            setError(true)
            return
        }
        
        alAceptar({...producto, nombre, ean, cantidad})
    }

    const cancelar = (e) => {
        e.preventDefault()
        alCancelar()
    }
    
    return(
        <form className="panel">
            <div className="info-edit">
                <input type="text" id="nombre-edit" placeholder="Nombre" value={nombre} onChange={cambiarNombre}/>
                <input type="number" id="ean-edit" placeholder="EAN" value={ean} onChange={cambiarEan}/>
                <input type="number" id="cantidad-edit" placeholder="Cantidad" value={cantidad} onChange={cambiarCantidad}/>
                {error && <p className="error">Debe ingresar todos los campos</p>}
            </div>
            <div className="acciones">
                <button onClick={aceptar}>Aceptar</button>
                <button type="button" onClick={cancelar}>Cancelar</button>
            </div>
        </form>
    )
}

function Mostrar({ producto, alAceptar, alBorrar, aumentarStock }){
    let [editando, setEditando] = useState(false)
    
    const editar = () => {setEditando(true)}
    const aumentar = () =>{aumentarStock(producto.ean)}
    const cancelar = () =>{setEditando(false)}

    return (
        <div>
            {editando ? (
                <Editar producto={producto} alAceptar={(productoEditado) => {alAceptar(productoEditado); setEditando(false)}} alCancelar={cancelar}/>
            ):(<>
            <div className="panel">
                <p id="cantidad" onClick={aumentar}>{producto.cantidad}</p>
                <div className="principal-info" onClick={aumentar}>
                    <h1 id="nombre">{producto.nombre}</h1>
                    <p id="ean"> {producto.ean}</p>
                </div>
                <div className="opciones">
                    <input id="editar" onClick={editar} type="image" src="./icons/edit.svg"></input>
                    <input id="borrar" onClick={() => alBorrar(producto.ean)} type="image" src="./icons/trash.svg"></input>
                </div>
            </div>
            </>)}
        </div>
    )
}

function Inventario({productos, alBorrar, alEditar, alAceptar, aumentarStock}){
    return <>
        {productos
            .map(producto => 
            <Mostrar 
            key={producto.ean} 
            producto={producto} 
            alAceptar={alAceptar} 
            alBorrar={alBorrar} 
            alEditar={alEditar} 
            aumentarStock={aumentarStock}/>)
        }    
    </>
}

function App() {
    const [productos, setProductos] = useState(productosIniciales.map(producto => ({...producto, id: `${Math.floor(Math.random()*(9999999999 - 1000000000) + 1000000000)}`})))
    const [panelEdicion, setPanelEdicion] = useState(false) 

    const aceptar = (productoEditado) => {
        const copia = productos.map(p => p.id === productoEditado.id ? productoEditado : p)
        setProductos(copia)
        setPanelEdicion(false)
    }

    const borrar = (ean) => {
        let copia = productos.filter(p => p.ean !== ean)
        setProductos(copia)
    }

    const agregar = () => {
        setPanelEdicion(true)
    }

    const aumentarStock = (ean) => {
        let nuevosProductos = productos.map(p => p.ean === ean && parseInt(p.cantidad) < 99 ? {...p, cantidad: parseInt(p.cantidad) + 1} : p)
        setProductos(nuevosProductos)
    }

    const cancelar = () =>{
        setPanelEdicion(false)
    }

    productos.sort((a,b) => a.nombre.localeCompare(b.nombre))
  
    return (
      <>
        <div className="encabezado">
          <h1>Control Depósito</h1>
          <input id="agregar" onClick={agregar} type="image" src="./icons/plus-square.svg"></input>
        </div>
        {panelEdicion && (
            <div className="paneles">
                <Editar producto={{ nombre: '', ean: '', stock: '' }} alAceptar={(nuevoProducto) => { setProductos([...productos, { ...nuevoProducto }]); setPanelEdicion(false); }} alCancelar={cancelar} />
            </div>
        )}
        <div className="paneles">
            <Inventario productos={productos} alBorrar={borrar} alAceptar={aceptar} aumentarStock={aumentarStock}/>
        </div>
      </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
