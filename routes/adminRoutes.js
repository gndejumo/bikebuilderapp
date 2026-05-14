const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId');

router.get('/allUser', verify, verifyAdmin, adminController.getAllUsers)
router.get('/allBuilds', verify, verifyAdmin, adminController.getAllBuilds)
router.get('/allOrders', verify, verifyAdmin, adminController.getAllOrders)
router.get('/dashboard', verify,verifyAdmin, adminController.getDashBoardStatus)
router.delete('/:id', verify, verifyAdmin, validateObjectId, adminController.deleteUser)

module.exports = router