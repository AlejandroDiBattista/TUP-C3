const Registros = [
    { id: 1, nomb: "Matias", apell: "Calvo", tel: 123456789 },
    { id: 2, nomb: "Melisa", apell: "Calvo", tel: 111111111 },
    { id: 3, nomb: "Anita", apell: "Calvo", tel: 222222222 },
    { id: 4, nomb: "Karina", apell: "Diaz", tel: 987654321 },
    { id: 5, nomb: "Mario", apell: "Calvo", tel: 999999999 }
]

const Contactos = () => (
    <div>
        <h1>Agenda</h1>
        {Registros.map(contacto => // Llena los elementos que contiene el registro
        <div class="tarjeta">
            <ul>ID: {contacto.id}</ul>
            <ul>{contacto.nomb} <b>{contacto.apell}</b></ul>
            <ul>Tel: {contacto.tel}</ul>
        </div>)}
    </div>
);

const App = () =>  (
    <div>
        <Contactos />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))