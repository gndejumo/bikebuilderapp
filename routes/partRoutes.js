const express = require('express')
const router = express.Router()
const partController = require('../controller/partController')
const {verify, verifyAdmin} = require('../middlewares/authMiddleware')
const {validateObjectId} = require('../middlewares/validateObjectId')


router.get('/', verify, partController.getPart)
router.get('/:id', verify,validateObjectId, partController.getPartById)
router.post('/addPart', verify, verifyAdmin, partController.addPart)
router.patch('/:id/update', verify, verifyAdmin,validateObjectId,partController.updatePart)
router.delete('/:id/delete', verify, verifyAdmin,validateObjectId, partController.deletePart)



module.exports = router