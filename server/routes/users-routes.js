const express = require('express')

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/api/users', usersController.getAllUsers);

router.get('/api/users/:id', usersController.getUserById);

module.exports = router;
