const Build = require('../models/Build')

const getMyBuilds = async (req, res, next) => {
    try {
        const builds = await Build.find({userId: req.user.id})
        if (!builds.length) {
            return res.status(404).json({
                message: "No builds yet"
            })
        }
        return res.status(200).json(builds)
    } catch (err) {
        next(err)
    }
}

const getBuildById = async (req, res, next) => {
    try {
        const build_id = req.params.id
        const build = await Build.findById(build_id)
        if (!build) {
            return res.status(404).json({
                message: "Build not found"
            })
        }
        res.status(200).json(build)
    } catch (err) {
        next(err)
    }
}

const updateBuild = async (req, res, next) => {
    try {
        const build_id = req.params.id
        const build = await Build.findById(build_id)
        if (!build) {
            return res.status(404).json({
                message: "Build not found"
            })
        }
        const {name, selectedParts, status } = req.body
        const updatedBuild = await Build.findByIdAndUpdate(build_id, 
            {name, selectedParts,status}, 
            {new: true})
        return res.status(200).json({
            message: "Successfully updated your bike build",
            build: updatedBuild
        })
    } catch (err) {
        next(err)
    }
}

const createBuild = async (req, res, next) => {
    try {
        const {name, selectedParts, status} = req.body
        const newBuild = new Build({userId: req.user.id, name, selectedParts, status})
        await newBuild.save()
        return res.status(201).json({
            message: "Build has been successfully created",
            build: newBuild
        })
    } catch (err) {
        next(err)
    }
    
}

const deleteBuild = async (req, res, next) => {
    try {
        const build_id = req.params.id
        const build = await Build.findById(build_id)
        if (!build) {
            return res.status(404).json({
                message: "Build not found"
            })
        }
        await Build.findByIdAndDelete(build_id)
        return res.status(200).json({
            message: "Successfully delete build"
        })
    } catch (err) {
        next(err)
    }
}




module.exports = {getMyBuilds, getBuildById, deleteBuild, updateBuild, createBuild}