const express = require ('express')
const router = express.Router()
const bikeController = require('../controller/bikeController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')

router.get('/', bikeController.getAllBikes)
router.get('/:id', validateObjectId, bikeController.getBikeById)
router.post('/', verify, verifyAdmin, bikeController.addBike)
router.patch('/:id', verify, verifyAdmin, validateObjectId, bikeController.updateBike)
router.delete('/:id', verify, verifyAdmin, validateObjectId,bikeController.deleteBike)


module.exports = router