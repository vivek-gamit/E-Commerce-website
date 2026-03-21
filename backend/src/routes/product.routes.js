const express = require("express")
const ProductMiddleware = require('../middlewares/multer.middleare')
const ProductController = require('../controllers/product.controller')

const router = express.Router();

router.post('/add',ProductMiddleware.array('images', 4), ProductController.addProduct);

module.exports = router;

