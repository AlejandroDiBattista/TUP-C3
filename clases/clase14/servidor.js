import { MongoClient, ObjectId} from 'mongodb';

async function run() {
    const uri = 'mongodb://localhost:27017';
    const cliente = new MongoClient(uri);

    try {
        await cliente.connect();
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        return;
    }

    const db = cliente.db('tup-c3');
    const contactos = db.collection('contactos');

    contactos.createIndex({ nombre: 1 }, { unique: true });
    try {
        // let resultado = await contactos.insertOne({
        //     nombre: 'Alejandro',
        //     apellido: 'Di Battista',
        //     email: 'adibattista@gmail.com',
        //     telefono: [
        //         { 'tipo': 'celular', 'numero': '1134567890' },
        //         { 'tipo': 'fijo', 'numero': '0114567890' }
        //     ]
        // });
        // console.log('Contacto insertado con éxito', resultado);
    
        // SELECT * FROM Contactos 
        //WHERE nombre = 'Alejandro' OR edad >= 18 AND edad <= 65
        // let resultado = await contactos.find(
        //     {
        //         $or: [
        //             { nombre: 'Alejandro' },
        //             { edad: { $gte: 18, $lte: 65 } }
        //         ]
        //     }
        // ).toArray();
        // let r = []
        // for await (let c of contactos.find()) {
        //     r.push(c);
        // }
        // console.log(r);

        // DELETE FROM contactos WHERE _id = '18627585'
        // let resultado = await contactos.deleteOne({
        //     nombre: 'Alejandro'
        // });
        
        cuenta.updateOne(
            { cuenta: 'a'},
            { $inc: { monto: -1000 } }
        )

        contactos
            .find({ edad: 30 })
            .sort({ apellido: 1, nombre: 1 })
            .limit(10)
            .skip(pagina*10)
        
        contactos.aggregate([
            { $match: { edad: 30 } },
            { $sort: { apellido: 1, nombre: 1 } },
            { $skip: pagina*10 },
            { $limit: 10 },
        ])
        
        // console.log('Contactos:', resultado);

        console.log(await contactos.find().toArray());


    } catch (error) {
        console.error('Error al insertar el contacto', error);
    } finally {
        cliente.close();
    }
}

run();