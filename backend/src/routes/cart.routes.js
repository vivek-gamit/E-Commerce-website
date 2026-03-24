const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, updateQuantity } = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/add',authMiddleware.authUser, addToCart); 
router.get('/getCart',authMiddleware.authUser, getCart )
router.delete('/remove/:id', authMiddleware.authUser, removeFromCart)
router.put('/update-qty',authMiddleware.authUser ,updateQuantity)

module.exports = router;