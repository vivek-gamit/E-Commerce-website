const express = require('express')
const adminController = require('../controllers/admin.controller')
const adminMiddleware = require('../middlewares/admin.middleware')

const router = express.Router();

router.post('/adminlogin',adminController.loginAdmin);

module.exports = router;