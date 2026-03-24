const express = require('express');
const router = express.Router();
const { allOrders, updateStatus } = require('../controllers/order.controller');
const { adminMiddleware } = require('../middlewares/admin.middleware');


router.post('/list',  allOrders);
router.post('/status',  updateStatus);

module.exports = router;