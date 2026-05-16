const express = require('express')
const router = express.Router()
const buildController = require('../controller/buildController')
const {verify} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')

router.get('/', verify, buildController.getMyBuilds )
router.get('/:id', verify,validateObjectId, buildController.getBuildById)
router.patch('/:id', verify,validateObjectId, buildController.updateBuild)
router.post('/', verify,buildController.createBuild)
router.delete('/:id',verify, validateObjectId, buildController.deleteBuild)

module.exports = router