const express = require('express');
const router = express.Router();
const { addToCart, getCart, removeFromCart, updateQuantity, toggleFavorite, getFavorites } = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/add',authMiddleware.authUser, addToCart); 
router.get('/getCart',authMiddleware.authUser, getCart )
router.post('/remove', authMiddleware.authUser, removeFromCart)
router.post('/update-qty',authMiddleware.authUser ,updateQuantity)
router.post('/favorite', authMiddleware.authUser, toggleFavorite)
router.get('/MyWishlist', authMiddleware.authUser, getFavorites)

module.exports = router;