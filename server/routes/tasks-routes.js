const express = require('express');

const tasksController = require('../controllers/tasks-controller');
const validateJWT = require('../middleware/validate-jwt');

const router = express.Router();

router.post('/tasks/new', validateJWT, tasksController.createTask);

router.get('/tasks/:id', validateJWT, tasksController.getTask);

router.get('/tasks', validateJWT, tasksController.getTasks);

module.exports = router;
