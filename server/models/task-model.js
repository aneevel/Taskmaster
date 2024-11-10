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
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(userID)
        } catch (error) {
            throw error;
        }
        return db.getDatabase().collection('tasks').find({ userID: uuid}).toArray();
    }

    static findByTaskId(taskID) {
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(taskID)
        } catch (error) {
            throw error;
        }
        return db.getDatabase().collection('tasks').find({ _id: uuid}).toArray();
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

    async patch(body, id) { 
        let uuid;
        try {
            uuid = mongodb.ObjectId.createFromHexString(id);
        } catch (error) {
            throw error;
        }
        return await db.getDatabase().collection('tasks').findOneAndUpdate({ "_id": uuid}, {$set: body }, { returnNewDocument: true});
    }
}
       
module.exports = Task;
