const Task = require('../models/task-model');
const ValidationUtil = require('../utility/validation');

const createTask = async (req, res, next) => {
    
    if (
        req.body == null ||
        req.body.description == null ||
        req.body.priority == null ||
        req.body.dueDate == null ||
        req.body.occurrence == null ||
        req.body.userID == null 
    ) {
        return res.status(400).send({ message: "Improper params supplied"});
    }

    const task = new Task(
        req.body.description,
        req.body.priority,
        req.body.dueDate,
        req.body.occurrence,
        req.body.userID
    );

    let taskID;
    try {
        taskID = await task.create();
    } catch (error) {
        return next(error);
    }

    return res.status(200).send({ message: "Task created", id: taskID });
}

const getTasks = async (req, res, next) => {

    if (req.params.id == null) {
        return res.status(400).send("Improper params supplied");
    }

    // TODO: We need to check for JWT here, don't we?
    console.log(`looking for tasks for user ${req.body.userID}`);
    let tasks;
    try {
        tasks = await tasks.findByUserId(req.body.userID);
    } catch (error) {
        return res.status(400).send("Unable to find tasks with userID");
    }

}

module.exports = {
    getTasks: getTasks,
    createTask: createTask
};
