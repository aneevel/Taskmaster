const ErrorMiddleware = (err, req, res, next) => {
    console.log("hi");
    const status = err.statusCode || 500;
    const message = err.message || 'An internal error happened with Taskmaster';
    res.status(status).json({
        success: false,
        status: status,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

module.exports = {
    error: ErrorMiddleware
}
