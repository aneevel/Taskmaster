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

    static async findAll() {
        return await db.getDatabase().collection('users').find({}).toArray();
    }

    static async findById(userID) {
        console.log('Finding user by ID:', userID);  // Debug log
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(userID);
        } catch (error) {
            console.error('Error creating ObjectId:', error);  // Debug log
            throw error;
        }
        return await db.getDatabase().collection('users').findOne({_id: uuid});
    }

    static async findByEmail(email) {
        const result = await db.getDatabase().collection('users').findOne({ email: email });
        return result;
    }

    async getUserWithSameEmail() {
        console.log('Looking up user by email:', this.email);
        const result = await db.getDatabase().collection('users').findOne({ email: this.email });
        console.log('Database lookup result:', result);
        return result;
    }

    async existsAlready() {
        console.log('Checking if user exists:', this.email);
        const existingUser = await this.getUserWithSameEmail();
        console.log('Existing user check result:', existingUser);
        if (existingUser == null) {
            console.log('No existing user found');
            return false;
        }
        console.log('User already exists');
        return true;
    }

    async signup() {
        console.log('Signing up user:', this.email);
        const encryptedPassword = await bcrypt.hash(this.password, 12);

        const result = await db.getDatabase().collection('users').insertOne({
            email: this.email,
            password: encryptedPassword,
            lname: this.lname,
            fname: this.fname,
            confirmed: this.confirmed,
            admin: this.confirmed,
            tasks: this.tasks 
        });
        console.log('Signup result:', result);
        return result;
    }

    

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }

    static async deleteByUserId(userID) {

        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(userID);
        } catch (error) {
            throw error;
        }
        return db.getDatabase().collection('users').deleteMany({_id: uuid});
    }

    async patch(body, id) {
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(id);
        } catch (error) {
            throw error;
        }
        return await db.getDatabase().collection('users').findOneAndUpdate({ "_id": uuid}, {$set: body}, { returnNewDocument: true});
    }

    static async updatePassword(email, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        const result = await db.getDb().collection('users').updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        if (result.matchedCount === 0) {
            const error = new Error('Could not find user.');
            error.code = 404;
            throw error;
        }

        if (result.modifiedCount === 0) {
            const error = new Error('Could not update password.');
            error.code = 500;
            throw error;
        }

        return result.modifiedCount === 1;
    }
}

module.exports = User;
