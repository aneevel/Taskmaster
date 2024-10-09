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
        return db.getDatabase().collection('tasks').find();
    }

    static findByUserId(userID) {
        const uuid = mongodb.ObjectId.createFromHexString(userID);
        return db.getDatabase().collection('tasks').findOne({userID: uuid});
        
    }

    async create() {
        console.log(`
            ${this.description}
            ${this.priority}
            ${JSON.stringify(this.dueDate)}
            ${this.occurrence}
            ${parseInt(this.userID)}
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
