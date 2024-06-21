const { createRoot } = ReactDOM;
const { useState } = React;

const Contacto = ({ id, nombre, apellido, telefono }) => {
    return (
        <div className="card">
            <div>ID: {id}</div> {}
            <div><b>{apellido}</b> {nombre}</div>
            <div>{telefono}</div>
        </div>
    );
};

const Agenda = ({ contactos }) => {
    return (
        <div className="agenda">
            {contactos.map(contacto => (
                <Contacto key={contacto.id} {...contacto} />
            ))}
        </div>
    );
};

const datosContactos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', telefono: '(381) 123-4567' },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', telefono: '(381) 123-4567' },
    { id: 3, nombre: 'Pedro', apellido: 'Gonzalez', telefono: '(381) 123-4567' },
    { id: 4, nombre: 'Ana', apellido: 'Fernandez', telefono: '(381) 123-4567' },
    { id: 5, nombre: 'Lucas', apellido: 'Rodriguez', telefono: '(381) 123-4567' },
    { id: 6, nombre: 'Carla', apellido: 'Lopez', telefono: '(381) 123-4567' },
    { id: 7, nombre: 'Jorge', apellido: 'Diaz', telefono: '(381) 123-4567' },
    { id: 8, nombre: 'Luis', apellido: 'Martinez', telefono: '(381) 123-4567' },
    { id: 9, nombre: 'Florencia', apellido: 'Paz', telefono: '(381) 123-4567' },
    { id: 10, nombre: 'Miguel', apellido: 'Rojas', telefono: '(381) 123-4567' }
];

const App = () => {
    return (
        <div>
            <h1>Agenda de Contactos</h1>
            <Agenda contactos={datosContactos} />
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);