const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {verify, verifyAdmin, } = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')

router.get('/me', verify, userController.getMe)
router.get('/:id', verify,validateObjectId, userController.getProfile)
router.patch('/:id/setAdmin', verify, verifyAdmin, userController.setAsAdmin)

module.exports = router
