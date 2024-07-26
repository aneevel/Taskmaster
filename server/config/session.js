const expressSession = require('express-session');
const mongoDBStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDBStore = mongoDBStore(expressSession);

    //TODO: Shouldn't be hardcoded!
    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'taskmaster',
        collection: 'sessions'
    });

    return store;
};

const createSessionConfig = () => {
    return {
        // TODO: Review what makes a good secret
        secret: 'a big secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: { 
            maxAge: 60 * 1000 * 60 * 24 * 2 
        }
    };
}

module.exports = createSessionConfig;

