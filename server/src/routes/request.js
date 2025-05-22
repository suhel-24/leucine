const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.post('/', jwtMiddleware, requestController.submitRequest);
router.patch('/:id', jwtMiddleware, requestController.updateRequestStatus);
router.get('/pendingrequests', jwtMiddleware, requestController.getAllPendingRequests);

module.exports = router; 