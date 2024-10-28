const Task = require('../../../models/task-model')

jest.mock('../../../models/task-model');

Task.create = jest.fn();

module.exports = {
    create: Task.create
};
