const Part = require('../models/Part')


    const getPart = async (req, res, next) => {
        try {
            const {name, category, brand} = req.query
            const filter = {}
            if (name) filter.name = { $regex: name, $options: 'i' }
            if (category) filter.category = { $regex: category, $options: 'i' }
            if (brand) filter.brand = { $regex: brand, $options: 'i' }
            const parts = await Part.find(filter)
            return res.status(200).json({
                parts
            })
        } catch (err) {
            next(err)
        }
    }

const addPart = async (req, res, next) => {
    try {
        const {name, category, brand, price, colors, specs, stock, status} = req.body
        // check if image was uploaded
        const images = {
            thumbnail: req.file ? req.file.path : null,
            preview:   req.file ? req.file.path : null
        }
        const newPart = new Part({
            name,
            category,
            brand,
            price,
            colors,
            images,
            specs,
            stock,
            status
        })
        await newPart.save()
        return res.status(201).json({
            message: "Successfully added part",
            newPart
        })
    }   catch(err){
    next(err)
    }
}

const getPartById = async (req, res, next) => {
    try {
        const part_id = req.params.id
        const part = await Part.findById(part_id)
        if (!part) {
            return res.status(404).json({
                message: "Part not found"
            })
        }
        return res.status(200).json(part)
    } catch (err) {
        next(err)
    }
}

const deletePart = async (req, res, next) => {
    try {
        const part_id = req.params.id
        const part = await Part.findById(part_id)
        if (!part) {
            return res.status(404).json({
                message: "Part not found"
            })
        }
        await Part.findByIdAndDelete(part_id)
        return res.status(200).json({
            message: "Successfully deleted part"
        })
    } catch (err) {
        next(err)
    }
}

const updatePart = async (req, res, next) => {
    try {
        const part_id = req.params.id
        const part = await Part.findById(part_id)
        if (!part) {
            return res.status(404).json({
                message: "Part not found"
            })
        }
        const { name, category, brand, price, colors, images, specs, stock, status } = req.body
        const updates = {}
        if (name !== undefined) updates.name = name
        if (category !== undefined) updates.category = category
        if (brand !== undefined) updates.brand = brand
        if (price !== undefined) updates.price = price
        if (colors !== undefined) updates.colors = colors
        if (images !== undefined) updates.images = images
        if (req.file) {
            updates.images = {
                thumbnail: req.file.path,
                preview:   req.file.path
            }
        } 
        if (specs !== undefined) updates.specs = specs
        if (stock !== undefined) updates.stock = stock
        if (status !== undefined) updates.status = status

        const updatedPart = await Part.findByIdAndUpdate(part_id, 
            {$set: updates}, 
            {returnDocument: 'after'})
        return res.status(200).json({
            message: "Successfully updated part",
            parts: updatedPart
        })

    } catch (err) {
        next(err)
    }
}


module.exports = {getPart, addPart, getPartById, deletePart, updatePart}