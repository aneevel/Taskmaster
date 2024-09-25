const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const expressSession = require('express-session');
const passport = require('passport');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');

const createSessionConfig = require('./config/session');
const db = require('./data/database');

const userRoutes = require('./routes/users-routes');
const authRoutes = require('./routes/auth-routes');

const sessionConfig = createSessionConfig();

const RSA_PUBLIC_KEY = fs.readFileSync('./public.pem');

const checkIfAuthenticated = jwt({
    secret: RSA_PUBLIC_KEY,
    algorithms: ["HS256"]
});

app.use(expressSession(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use(morgan('combined'));

var corsOptions;

if (process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev', {
        stream: fs.createWriteStream(path.join(__dirname, 'logs', 'error.log'), { flags: 'a' }),
        skip: function (req, res) { return res.statusCode < 400 }
    }));

    app.use(morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
    }));

   corsOptions = {
       origin: 'http://localhost:4200',
   };
       
} else if (process.env.NODE_ENV === 'development') {
    corsOptions = {
        origin: 'http://localhost:4200'
    };
}

app.use(cors(corsOptions));

app.get('/api', function (req, res) { return res.send('Hello from Express!'); });

app.use(userRoutes);
app.use(authRoutes);

db.connectToDatabase().then(() => {
    app.listen(process.env.API_PORT, "localhost");
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});
