const { upload } = require('../config/cloudinary')

const uploadSingle   = upload.single('image')    // for single image
const uploadMultiple = upload.array('images', 5) // for multiple images max 5

module.exports = { uploadSingle, uploadMultiple }