const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')
const { verify } = require("../middlewares/authMiddleware");
const {validateObjectId} = require('../middlewares/validateObjectId');

router.get('/me', verify, orderController.getMyOrders)
router.get('/:id', verify,validateObjectId, orderController.getOrderById)
router.post('/', verify, orderController.createOrder)
router.patch('/:id/status', verify,validateObjectId, orderController.updateOrderStatus)
router.patch('/:id/cancel', verify,validateObjectId, orderController.cancelOrder)

module.exports = router