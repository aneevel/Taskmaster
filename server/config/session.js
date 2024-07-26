const expressSession = require('express-session');
const mongoDBStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDBStore = mongoDBStore(expressSession);

    const store = new MongoDBStore({
        uri: `mongodb://localhost:${process.env.MONGO_DB_PORT}`,
        databaseName: 'taskmaster',
        collection: 'sessions'
    });

    return store;
};

const createSessionConfig = () => {
    return {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: { 
            maxAge: 60 * 1000 * 60 * 24 * 2 
        }
    };
}

module.exports = createSessionConfig;

