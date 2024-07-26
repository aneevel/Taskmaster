const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const connectToDatabase = async() => {
    const client = await MongoClient.connect(`mongodb://${process.env.MONGO_URL}:${process.env.MONGO_DB_PORT}`);
    database = client.db('taskmaster')
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
