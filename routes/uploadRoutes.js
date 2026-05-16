const express = require('express')
const router  = express.Router()
const { uploadSingle } = require('../middlewares/uploadMiddleware')
const { uploadImage }  = require('../controller/uploadController')
const { verify }       = require('../middlewares/authMiddleware')

router.post('/', verify, uploadSingle, uploadImage)

module.exports = router