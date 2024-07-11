import * as express from 'express';
const app = express();
const users = [
    { id: 0, lname: "Neevel", fname: "Alec", confirmed: true, admin: true },
    { id: 1, lname: "Admin", fname: "Taskmaster", confirmed: true, admin: true }
];
function getUsers() {
    return users;
}
app.get('/api', (req, res) => res.send('Hello from Express!'));
app.get('/api/users', (req, res) => {
    res.json(getUsers());
});
function getUserById(userID) {
    return users.find(user => user.id === userID);
}
app.get('/api/users/:id', (req, res) => {
    res.json(getUserById(parseInt(req.params.id)));
});
const server = app.listen(8000, "localhost", () => {
    console.log(`Listening on localhost:8000`);
});
//# sourceMappingURL=server.js.map