const express = require('express')
const app = express();

const db = require('./data/database');

const userRoutes = require('./routes/users-routes');

app.get('/api', function (req, res) { return res.send('Hello from Express!'); });

app.use(userRoutes);

db.connectToDatabase().then(() => {
    app.listen(8000, "localhost");
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});
