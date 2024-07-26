const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const db = require('./data/database');

const userRoutes = require('./routes/users-routes');

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use(morgan('dev', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'error.log'), { flags: 'a' }),
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
}));

app.get('/api', function (req, res) { return res.send('Hello from Express!'); });

app.use(userRoutes);

db.connectToDatabase().then(() => {
    app.listen(8000, "localhost");
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});
