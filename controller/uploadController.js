const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' })
        }
        return res.status(200).json({
            message:   'Image uploaded successfully',
            url:       req.file.path,      // cloudinary URL
            public_id: req.file.filename   // for deleting later
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { uploadImage }