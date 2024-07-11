const mongodb = require('mongodb')

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
}
