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

    static findAll() {
        return db.getDatabase().collection('tasks').find().toArray();
    }

    static findByUserId(userID) {
        return db.getDatabase().collection('tasks').find({ userID: userID}).toArray();
    }

    async create() {

        return await db.getDatabase().collection('tasks').insertOne({
            description: this.description,
            priority: this.priority,
            dueDate: JSON.stringify(this.dueDate),
            occurrence: this.occurrence,
            userID: parseInt(this.userID)
        });
    }
}
       
module.exports = Task;
