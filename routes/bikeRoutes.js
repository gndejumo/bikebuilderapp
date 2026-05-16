const express = require ('express')
const router = express.Router()
const bikeController = require('../controller/bikeController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')
const { uploadSingle } = require('../middlewares/uploadMiddleware')

router.get('/', bikeController.getAllBikes)
router.get('/:id', validateObjectId, bikeController.getBikeById)
router.post('/', verify, verifyAdmin, uploadSingle,bikeController.addBike)
router.patch('/:id', verify, verifyAdmin, validateObjectId,uploadSingle, bikeController.updateBike)
router.delete('/:id', verify, verifyAdmin, validateObjectId,bikeController.deleteBike)


module.exports = router