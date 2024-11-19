const express = require('express')

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/users', usersController.getAllUsers);

router.get('/users/:id', usersController.getUserById);

module.exports = router;
