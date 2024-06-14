// importar librerias
const mongoose = require('mongoose');
// uri de mongo
const mongoURI = process.env.MONGODB_URI;

const mongoConnection = async() => {
    try {
        await mongoose.connect(mongoURI);
        console.log('<<< DB CONECTADA >>>');
    } catch (error) {
        console.log('Error al conectar mongoDB');
    }
}


module.exports = mongoConnection;
