const express = require('express');

const tasksController = require('../controllers/tasks-controller');
const verifyJWT = require('../middleware/validate-jwt');

const router = express.Router();

router.post('/tasks/new', verifyJWT,  tasksController.createTask)

router.get('/tasks/:id', verifyJWT, tasksController.getTask);

router.get('/tasks', verifyJWT, tasksController.getTasks);

router.patch('/tasks/:id', verifyJWT, tasksController.patchTask);

module.exports = router;
