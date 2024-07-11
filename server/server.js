const express = require('express')
const app = express();

const db = require('./data/database');

let users = [
    { id: 0,
        lname: "Neevel",
        fname: "Alec",
        email: "aneevel15@gmail.com",
        confirmed: true,
        admin: true,
        tasks: []
    },
    { id: 1, lname: "Admin", fname: "Taskmaster", email: "admin@taskmaster.com", confirmed: true, admin: true, tasks: [] }
];

function getUsers() {
    return users;
}
app.get('/api', function (req, res) { return res.send('Hello from Express!'); });

app.get('/api/users', function (req, res) {
    res.json(getUsers());
});

function getUserById(userID) {
    return users.find(function (user) { return user.id === userID; });
}

app.get('/api/users/:id', function (req, res) {
    res.json(getUserById(parseInt(req.params.id)));
});

db.connectToDatabase().then(() => {
    app.listen(8000, "localhost");
}).catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
});
