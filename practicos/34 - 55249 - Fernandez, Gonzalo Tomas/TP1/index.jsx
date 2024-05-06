const Title = () => <h1>🕵️‍♂️Mi Agenda🕵️‍♂️</h1>;

const Header = () => (
  <div id="title">
    <Title />
  </div>
);

const Contacts = () => [
  { id: 1, nombre: 'Julian', apellido: 'Rodrigéz', telefono: '381-456-7890' },
  { id: 2, nombre: 'Karen', apellido: 'Gonzaléz', telefono: '381-567-8901' },
  { id: 3, nombre: 'Gabriel', apellido: 'Santillan', telefono: '381-678-9012' },
  { id: 4, nombre: 'Lourdes', apellido: 'Olea', telefono: '381-789-0123' },
  { id: 5, nombre: 'Macarena', apellido: 'Sánchez', telefono: '381-890-1234' },
  { id: 6, nombre: 'Lourdes', apellido: 'Rodrigéz', telefono: '381-901-2345' },
  { id: 7, nombre: 'Gabriel', apellido: 'Isa', telefono: '381-012-3456' },
  { id: 8, nombre: 'Barbara', apellido: 'Santillan', telefono: '381-123-4567' },
  { id: 9, nombre: 'Leandro', apellido: 'Ausar', telefono: '381-234-5678' },
  { id: 10, nombre: 'Valentin', apellido: 'Giménez', telefono: '381-345-6789' },
];

const Contact = ({ nombre, apellido, telefono }) => (
  <tr>
    <td>{nombre}</td>
    <td>{apellido}</td>
    <td>{telefono}</td>
  </tr>
);

const Content = () => (
  <div className="contact">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
        </tr>
      </thead>
      <tbody>
        {Contacts().map((contact) => (
          <Contact
            key={contact.id}
            nombre={contact.nombre}
            apellido={contact.apellido}
            telefono={contact.telefono}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const Footer = () => (
  <div className="footer">
    <footer>@Gonzalo Tomas Fernandez</footer>
  </div>
);

const Agenda = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

const App = () => <Agenda />;

ReactDOM.render(<App />, document.getElementById('root'));
