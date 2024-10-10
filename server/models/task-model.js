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
        const uuid = mongodb.ObjectId.createFromHexString(userID);
        return db.getDatabase().collection('tasks').findOne({'_id': uuid});
    }

    async create() {
        console.log(`
            ${this.description}
            ${this.priority}
            ${this.dueDate}
            ${this.occurrence}
            ${this.userID}
        `);

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
