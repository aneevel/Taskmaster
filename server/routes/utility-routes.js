const express = require('express');
const router = express.Router();
const { getHealthStatus } = require('../controllers/utility-controller');

// Health check endpoint
router.get('/health', getHealthStatus);

module.exports = router; 