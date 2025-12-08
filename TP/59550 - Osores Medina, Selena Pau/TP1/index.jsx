const contacts = [
    {
        id: 1,
        name: "Ayelen",
        surname: "Delgado",
        tel: 123456789
    },
    {
        id: 2,
        name: "Celeste",
        surname: "Delgado",
        tel: 123456789
    },
    {
        id: 3,
        name: "Lucia",
        surname: "Lopez",
        tel: 123456789
    },
    {
        id: 4,
        name: "Cristian",
        surname: "Ruiz",
        tel: 123456789
    },
    {
        id: 5,
        name: "Juan",
        surname: "Arias",
        tel: 123456789
    },
    {
        id: 6,
        name: "Hernan",
        surname: "Martinez",
        tel: 123456789
    },
    {
        id: 7,
        name: "Kiara",
        surname: "Mohamed",
        tel: 123456789
    },
    {
        id: 8,
        name: "Diego",
        surname: "Moreno",
        tel: 123456789
    },
    {
        id: 9,
        name: "Noelia",
        surname: "Medina",
        tel: 123456789
    },
    {
        id: 10,
        name: "Valentin",
        surname: "Juarez",
        tel: 123456789
    },
    {
        id: 11,
        name: "Abigail",
        surname: "fernandez",
        tel: 123456789
    }
];
const Agenda = () => (
    <main>
        <h1>Agenda</h1>
        {contacts.map(contact => 
        <div class="contacto">
            <div class="tarjeta">
                <li>ID: <b>{contact.id}</b>
                    <ul>Nombre: {contact.name} {contact.surname}</ul>
                    <ul>Telefono: {contact.tel}</ul>
                </li>
            </div>
        </div>)}
    </main>
);


const App = () =>  (
    <div>
        <Agenda />
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'))