const express = require('express')
const router = express.Router()
const partController = require('../controller/partController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')
const {uploadSingle} = require('../middlewares/uploadMiddleware')

router.get('/', partController.getPart)
router.get('/:id', verify,validateObjectId,partController.getPartById)
router.post('/addPart', verify, verifyAdmin, uploadSingle, partController.addPart)
router.patch('/:id', verify, verifyAdmin,validateObjectId,uploadSingle, partController.updatePart)
router.delete('/:id', verify, verifyAdmin,validateObjectId, partController.deletePart)



module.exports = router