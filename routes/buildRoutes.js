const express = require('express')
const router = express.Router()
const buildController = require('../controller/buildController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')

router.get('/', verify, buildController.getMyBuilds )
router.get('/:id', verify,validateObjectId, buildController.getBuildById)
router.patch('/:id/update', verify,validateObjectId, buildController.updateBuild)
router.post('/create', verify,buildController.createBuild)
router.delete('/:id/delete',verify, validateObjectId, buildController.deleteBuild)

module.exports = router