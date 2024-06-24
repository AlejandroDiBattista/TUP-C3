const data = [
    { id: 1, username: 'Julian', lastname: 'Rodrigéz', phone: '(381) 456-7890' },
    { id: 2, username: 'Karen', lastname: 'Gonzaléz', phone: '(381) 567-8901' },
    {
      id: 3,
      username: 'Gabriel',
      lastname: 'Santillan',
      phone: '(381) 678-9012',
    },
    { id: 4, username: 'LUCAS', lastname: 'RACEDO', phone: '(381) 799-0123' },
    { id: 5, username: 'victor', lastname: 'Sánchez', phone: '(381) 850-1234' },
    { id: 6, username: 'Lourdes', lastname: 'Rodrigéz', phone: '(381) 906-2345' },
    { id: 7, username: 'Gaby', lastname: 'paz', phone: '(381) 055-3456' },
    {
      id: 8,
      username: 'Barbara',
      lastname: 'Santillan',
      phone: '(381) 123-4567',
    },
    { id: 9, username: 'Leandro', lastname: 'Ausar', phone: '(381) 234-5678' },
    {
      id: 10,
      username: 'MALENA',
      lastname: 'Giménez',
      phone: '(381) 345-6789',
    },
  ];
  
  const Contact = ({ username, lastname, phone }) => (
    <tr>
      <td>{username}</td>
      <td>{lastname}</td>
      <td>{phone}</td>
    </tr>
  );
  
  const App = () => (
    <div>
      <header>
        <h1 className="title">🕵️‍♂️ Mi Agenda 🕵️‍♂️</h1>
      </header>
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
            {data.map((contact) => (
              <Contact
                key={contact.id}
                username={contact.username}
                lastname={contact.lastname}
                phone={contact.phone}
              />
            ))}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        <p>@Castillo Ignacio agustin</p>
      </footer>
    </div>
  );
  
  ReactDOM.render(<App />, document.getElementById('root'));