const mongoose = require('mongoose');


function connectToDb() {
    const mongoUri = process.env.DB_CONNECT || process.env.MONGODB_URI;

    if (!mongoUri) {
        console.warn('MongoDB connection string is not configured. Server will continue without database connection.');
        return;
    }

    mongoose.connect(mongoUri).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err));
}


module.exports = connectToDb;
