const db = require('../data/database');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

class User {
    constructor(email, password, lname, fname) {
        this.email = email;
        this.password = password;
        this.lname = lname;
        this.fname = fname;
        this.confirmed = false;
        this.admin = false;
    }

    static findAll() {
        return db.getDatabase().collection('users').find({}, { projection: { password: 0 } }).toArray();
    }

    static findById(userID) {
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(userID);
        } catch (error) {
            throw error;
        }
        return db.getDatabase().collection('users').findOne({_id: uuid}, { projection: { password: 0 } });
    }

    getUserWithSameEmail() {
        return db.getDatabase().collection('users').findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser == null) {
            return false;
        }
        return true;
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

    

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }

    static async deleteByUserId(userID) {

        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(userID);
        } catch (error) {
            throw error 
        }
        return db.getDatabase().collection('users').deleteMany({_id: uuid});
    }
}

module.exports = User;
