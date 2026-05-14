const User = require('../models/User')



const getProfile = async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await User.findById(id).populate({
            path: "orders",
            select: ["userId", "buildId", "status","totalAmount"]
        }).populate({
            path: "builds",
            select: ['name','totalPrice','status' ]
        }).select('-password')
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "Successfully retrieved user profile",
            user
        })
    } catch (err) {
        next(err)
    }
}

const getMe = async(req, res, next) => {
    try {
        const user = await User.findById(req.user?.id).select('-password')
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({ 
            message: "Successfully retrieved your profile",
            user
        }) 

    } catch (err) {
        next(err)
    }
}

const setAsAdmin = async (req, res, next) => {
    try {
        const userId = req.params.id
        const updatedUser = await User.findByIdAndUpdate(userId,
            {role: 'admin'},
            {new: true}
        ).select('-password')
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "Successfully updated user to admin",
            user: updatedUser
        })

    } catch (err) {
        next(err)
    }
}



module.exports = {getProfile, getMe, setAsAdmin}