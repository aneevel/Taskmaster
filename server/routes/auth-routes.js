const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');

router.post('/register', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.patch('/change-password', authController.changePassword);

module.exports = router;
