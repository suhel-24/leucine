const express = require('express');
const router = express.Router();
const softwareController = require('../controllers/softwareController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/', jwtMiddleware, softwareController.createSoftware);
router.get('/', jwtMiddleware, softwareController.getAllSoftware);

module.exports = router; 