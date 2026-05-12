const express = require('express')
const router = express.Router();
const authController = require('../controller/authController')
const {verify} = require('../middlewares/authMiddleware')


router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', verify,authController.logoutUser)
router.post('/refresh', authController.refreshUserToken)


module.exports = router