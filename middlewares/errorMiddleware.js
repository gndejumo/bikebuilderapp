const errorHandler = (err, req, res, next) => {
    // Log error
    console.log(err);

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server error'

    // Send a standardized error response
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'Server error',
            details: err.details || null
        }
    });

}

module.exports = errorHandler