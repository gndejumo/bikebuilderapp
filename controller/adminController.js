const User = require('../models/User')
const Build = require('../models/Build')
const Order = require('../models/Order')
const Part = require('../models/Part')


const getAllBuilds = async(req, res, next) => {
    try {
        const builds = await Build.find()
        return res.status(200).json(builds)
    } catch (err) {
        next(err)
    }
}

const getAllUsers = async(_req, res, next) => {
    try {
        const users = await User.find()
        const safeUser = users.map(user => {
            const {password: _password, ...safeUser} = user.toObject()
            return safeUser
        })
        return res.status(200).json(safeUser)
    } catch (err) {
        next(err)
    }
}


const getAllOrders = async (_req, res, next) => {
    try {
        const orders = await Order.find()
        return res.status(200).json(orders)
    } catch (err) {
        next(err)
    }
}

const getDashBoardStatus = async (_req, res, next) => {
    try {
        const totalUsers = await User.countDocuments()
        const totalOrders = await Order.countDocuments()
        const totalBuilds = await Build.countDocuments()
        const totalParts = await Part.countDocuments()

        const dashboardStatus = await Order.aggregate([
            {$group: {_id: '$status', total: {$sum: "$totalAmount"}}}
        ])
        return res.status(200).json({
            users: totalUsers,
            orders: totalOrders,
            builds: totalBuilds,
            parts: totalParts,
            ordersByStatus: dashboardStatus
        })
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const user = await User.findByIdAndDelete(user_id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "Successfully deleted user"
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {getAllBuilds, getAllUsers, getAllOrders, getDashBoardStatus, deleteUser}