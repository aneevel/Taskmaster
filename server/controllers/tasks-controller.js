const Task = require('../models/task-model');
const ValidationUtil = require('../utility/validation');

const createTask = async (req, res, next) => {

}

const getTasks = async (req, res, next) => {

    if (req.params.id == null) {
        return res.status(400).send("Improper params supplied!");
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
