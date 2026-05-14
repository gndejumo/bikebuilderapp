const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')
const { verify, verifyAdmin } = require("../middlewares/authMiddleware");
const {validateObjectId} = require('../middlewares/validateObjectId');

router.get('/', verify, verifyAdmin, orderController.getOrder)
router.get('/:id', verify,validateObjectId, orderController.getOrderById)
router.get('/me', verify, orderController.getMyOrders)
router.post('/create', verify, verifyAdmin, orderController.createOrder)
router.patch('/:id/status', verify,validateObjectId, orderController.updateOrderStatus)
router.patch('/:id/cancel', verify,validateObjectId, orderController.cancelOrder)

module.exports = router