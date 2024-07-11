const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;
let port = 27017;

const connectToDatabase = async() => {
    const client = await MongoClient.connect(`mongodb://localhost:${port}`);
    database = client.db('users')
}

const getDatabase = () => {
    if (!database) {
        throw new Error("not connected to database!");
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDatabase: getDatabase 
}
