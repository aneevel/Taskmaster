const db = require('../data/database');
const bcrypt = require('bcrypt');

class User {
    constructor(email, password, lname, fname) {
        this.email = email;
        this.password = password;
        this.lname = lname;
        this.fname = fname;
        this.confirmed = false;
        this.admin = false;
        this.tasks = [];
    }

    static findAll() {
        console.log(db.getDatabase().collection('users'));
        return db.getDatabase().collection('users').find( { projection: { password: 0 } }).toArray();
    }

    static findById(userID) {
        return db.getDatabase().collection('users').findOne({id: userID}, { projection: { password: 0 } });
    }

    getUserWithSameEmail() {
        return db.getDatabase().collection('users').findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser)
            return true;
        return false;
    }

    async signup() {
        const encryptedPassword = await bcrypt.hash(this.password, 12);

        await db.getDatabase().collection('users').insertOne({
            email: this.email,
            password: encryptedPassword,
            lname: this.lname,
            fname: this.fname,
            confirmed: this.confirmed,
            admin: this.confirmed,
            tasks: this.tasks 
        });
    }
            
}

module.exports = User;
