const express = require("express")
const ProductMiddleware = require('../middlewares/multer.middleare')
const ProductController = require('../controllers/product.controller')
const adminMiddleware = require('../middlewares/admin.middleware')
const getProductById = require('../controllers/product.controller')

const router = express.Router();

router.post('/add',adminMiddleware.adminMiddleware,ProductMiddleware.array('images', 4), ProductController.addProduct);
router.get('/list', ProductController.listProduct)
router.post('/delete', ProductController.removeProduct)
router.get('/:id', ProductController.getProductById);

module.exports = router;

