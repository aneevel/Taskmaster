const express = require('express')

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.get('/api/users', usersController.getAllUsers);

router.post('/api/users/new', usersController.signup);

module.exports = router;
