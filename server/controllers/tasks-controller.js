const { MAX } = require('uuid');
const Task = require('../models/task-model');
const User = require('../models/user-model');

const MAX_DESCRIPTION_LENGTH = 100;

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

    if (req.body.description.trim() === "") {
        return res.status(400).json({ message: "Tasks must have a non-empty description" });
    }

    if (req.body.description.length > MAX_DESCRIPTION_LENGTH) {
        return res.status(400).json({ message: "Task descriptions must not exceed 100 characters" });
    }

    if (req.body.priority.trim() === "") {
        return res.status(400).json({ message: "Tasks must have a non-empty priority" });
    }

    if (parseInt(req.body.priority) !== 3 && parseInt(req.body.priority) !== 2 && parseInt(req.body.priority) !== 1) {
        return res.status(400).json({ message: "Tasks must have a priority of 1, 2, or 3" });
    }

    if (req.body.dueDate === "") {
        return res.status(400).json({ message: "Tasks must have a non-empty due date" });
    }

    if (req.body.dueDate < Date.now()) {
        return res.status(400).json({ message: "Tasks must have a due date that has not already occurred" });
    }

    if (req.body.occurrence.trim() === "") {
        return res.status(400).json({ message: "Tasks must have a non-empty occurrence" });
    }

    if (!(new Array("Daily", "Weekly", "Monthly", "Once").includes(req.body.occurrence))) {
        return res.status(400).json({ message: "Tasks must have an occurrence of Daily, Weekly, Monthly, or Once" });
    }

    try {
        User.findById(req.body.userID)
    } catch (error) {
        return res.status(400).json({ message: "User with userID does not exist" });
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
        return res.status(400).json({message: "Improper params supplied"});
    }

    let tasks;
    try {
        tasks = await Task.findByUserId(req.params.id);
    } catch (error) {
        return next(error);
    }

    // Empty array means there is no user associated with any tasks, business
    // logic is that this fails
    if (!Array.isArray(tasks) || !tasks.length) {
        return res.status(400).json({ message: "No tasks associated with user ID" });
    }

    return res.status(200).send(tasks);
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
