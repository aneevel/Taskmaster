const db = require('../data/database');
const mongodb = require('mongodb');

class Task {
    constructor(description, priority, dueDate, occurrence, userID) {
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.occurrence = occurrence;
        this.userID = userID;
    }

    static findByUserId(userID) {
        const uuid = mongodb.ObjectId.createFromHexString(userID);
        return db.getDatabase().collection('tasks').findOne({userID: uuid});
        
    }
}
       
module.exports = User;
