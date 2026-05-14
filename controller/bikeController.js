const Bike = require ('../models/Bike')

const getAllBikes = async (_req, res, next) => {
    try {
        const bikes = await Bike.find()
        if (!bikes.length) {
            return res.status(404).json({
                message: "No bikes yet"
            })
        }
        return res.status(200).json(bikes)
    } catch (err) {
        next(err)
    }
}

const getBikeById = async (req, res, next) => {
    try {
        const bike_id = req.params.id
        const bike = await Bike.findById(bike_id)
        if (!bike) {
            return res.status(404).json({
                message: "No bike found"
            })
        }
        res.status(200).json(bike)
    } catch (err) {
        next(err)
    }
}

const addBike = async (req, res, next) => {
    try {
        const {name, description, defaultParts, basePrice, images} = req.body
        const newBike = new Bike({
            name, description, defaultParts, basePrice, images
        })
        await newBike.save()
        return res.status(201).json({
            message: "Successfully created bike",
            newBike
        })
    } catch (err) {
        next(err)
    }
}


const deleteBike = async (req, res, next) => {
    try {
        const bike_id = req.params.id
        const bike = await Bike.findByIdAndDelete(bike_id)
        if (!bike) {
            return res.status(404).json({
                message: "Bike not found"
            })
        }
        return res.status(200).json({
            message: "Bike has been successfully deleted"
        })
        
    } catch (err) {
        next(err)
    }
}

const updateBike = async (req, res, next) => {
    try {
        const bike_id = req.params.id
        const {name, description, defaultParts, basePrice, images, isActive} = req.body
        const updates = {}
        if (name !== undefined) updates.name = name
        if (description !== undefined) updates.description = description
        if (defaultParts !== undefined) updates.defaultParts = defaultParts
        if (basePrice !== undefined) updates.basePrice = basePrice
        if (images !== undefined) updates.images = images
        if (isActive !== undefined) updates.isActive = isActive
        
        const updatedBike = await Bike.findByIdAndUpdate(bike_id, 
            {$set: updates}, {new: true})
        if (!updatedBike) {
            return res.status(404).json({
                message: "Bike not found"
            })
        }
        return res.status(200).json({
            message: "Successfully updated bike",
            updatedBike
        })
    } catch (err) {
        next(err)
    }
}


module.exports = {getAllBikes, getBikeById, addBike, deleteBike, updateBike}