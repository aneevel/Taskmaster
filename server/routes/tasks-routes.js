const express = require('express');

const tasksController = require('../controllers/tasks-controller');

const router = express.Router();

router.post('/tasks/new', tasksController.createTask);

router.post('/tasks/:id', tasksController.findByUserId);

module.exports = router;
