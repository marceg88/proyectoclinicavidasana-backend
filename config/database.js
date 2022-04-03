const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI_DEV

const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

exports.connectToDb = () => {
    mongoose.connect(MONGO_URI, options);
    const { connection } = mongoose;
    connection.once('open', () => console.log('Conexión establecida'));
    connection.on('error', (err) => console.log('Algó salio mal'));
    return connection;
};