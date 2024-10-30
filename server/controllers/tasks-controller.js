const Task = require('../models/task-model');

const createTask = async (req, res, next) => {
    
    if (
        req.body == null ||
        req.body.description == null ||
        req.body.priority == null ||
        req.body.dueDate == null ||
        req.body.occurrence == null ||
        req.body.userID == null 
    ) {
        return res.status(400).json({ message: "Improper params supplied"});
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

    return res.status(201).json({ message: "Task created", id: taskID });
}

const getTask = async (req, res, next) => {

    if (req.params.id == null) {
        return res.send(400).json({message: "Improper params supplied"});
    }

    let task;
    try {
        task = await Task.findByUserId(req.params.id);
    } catch (error) {
        return next(error);
    }

    return res.sendStatus(200).send(task);
}

const getTasks = async (req, res, next) => {
   
    let tasks;
    try {
        tasks = await Task.findAll();
    } catch (error) {
        return next(error);
    }

    return res.json(tasks);
}

module.exports = {
    getTask: getTask,
    getTasks: getTasks,
    createTask: createTask
};
