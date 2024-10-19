const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refresh-token-controller');

router.post('/', refreshTokenController.refresh);

module.exports = router;
