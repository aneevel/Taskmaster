const db = require('../data/database');

class User {
    constructor(email, password, lname, fname) {
        this.email = email;
        this.password = password;
        this.lname = lname;
        this.fname = fname;
        this.confirmed = 0;
        this.admin = 0;
        this.tasks = [];
    }

    static findAll() {
        console.log(db.getDatabase().collection('users'));
        return db.getDatabase().collection('users').find( { projection: { password: 0 } }).toArray();
    }

    static findById(userID) {
        return db.getDatabase().collection('users').findOne({id: userID}, { projection: { password: 0 } });
    }
}

module.exports = User;
