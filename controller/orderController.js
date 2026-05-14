const Order = require('../models/Order')
const Build = require('../models/Build')

const createOrder = async (req, res, next) => {
    try {
        const {buildId, payment, shipping} = req.body
        const build = await Build.findById(buildId)
        // check build
        if (!build) {
            return res.status(404).json({
                message: "Build not found"
            })
        }
        // check ownership
        if (build.userId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized user"
            })
        }
        // create order
        const newOrder = new Order({
            userId: req.user.id,
            buildId,
            buildSnapshot: build.toObject(),
            totalAmount: build.totalPrice,
            payment,
            shipping
        })
        await newOrder.save()
        return res.status(201).json({
            message: "Successfully created order",
            order: newOrder
        })
    } catch (err) {
        next(err)
    }
}

const getOrder = async (_req, res, next) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const id = req.params.id
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json(order)
    } catch (err) {
        next(err)
    }
}

const getMyOrders = async (req, res, next) => {
    try {
        const orders= await Order.find({userId: req.user.id})
        if (!orders.length) {
            return res.status(404).json({
                message: "No orders yet"
            })
        }
        res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}


const updateOrderStatus = async (req, res, next) => {
    try {
        const order_id = req.params.id
        const order = await Order.findById(order_id)
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        const {status} = req.body
        const updatedStatus = await Order.findByIdAndUpdate(order_id, {status}, {new: true})
        return res.status(200).json({
            message: "Successfully updated Order status",
            status: updatedStatus
        })
    } catch (err) {
        next(err)
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        const order_id = req.params.id
        const order = await Order.findById(order_id)
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        const cancelOrder = await Order.findByIdAndUpdate(order_id, {status: 'cancelled'}, {new: true})
        res.status(200).json({
            message: "Successfully deleted order",
            order: cancelOrder
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {createOrder, getOrder, getOrderById, getMyOrders, updateOrderStatus, cancelOrder}