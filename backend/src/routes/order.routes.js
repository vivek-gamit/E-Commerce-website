const express = require('express');
const router = express.Router();
const { placeOrder, userOrders } = require('../controllers/order.controller');
const { authUser } = require('../middlewares/auth.middleware');


router.post('/place',authUser,placeOrder );
router.get('/myOrders',authUser, userOrders);


module.exports = router;