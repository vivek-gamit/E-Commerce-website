const express = require('express');
const router = express.Router();
const { placeOrder, userOrders, listOrdersAdmin,updateOrderStatus } = require('../controllers/order.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { adminMiddleware } = require('../middlewares/admin.middleware')


router.post('/place',authUser,placeOrder );
router.get('/myOrders',authUser, userOrders);
router.get('/orderList', listOrdersAdmin);
router.post('/status', updateOrderStatus)


module.exports = router;