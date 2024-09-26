const express = require('express');

const tasksController = require('../controllers/tasks-controller');

const router = express.Router();

router.post('/tasks/new', tasksController.createTask);

router.get('/tasks/:id', tasksController.getTasks);

module.exports = router;
