const express = require('express')
const authcontroller  = require('../controllers/auth.controller')
const authMiddleare = require('../middlewares/auth.middleware')

const router = express.Router();

router.post("/register", authcontroller.registerUser)
router.post("/login", authcontroller.loginUser)
router.get("/profile",authMiddleare.authUser, authcontroller.getUserProfile)
router.post('/logout', authcontroller.logoutUser);

module.exports = router;