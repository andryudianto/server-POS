module.exports = function errorHandler(err, req, res, next) {
    console.log(err,   `ini error`)
    let statusCode = 500
    let message = "Internal Server Error!"
    switch (err.name) {
        case "SequelizeValidationError":
            statusCode = 400
            message = err.errors[0].message
            break;
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = `${err.errors[0].message} already exists`
            break;
        case "JsonWebTokenError":
            statusCode = 401
            message = 'Failed to authenticate'
            break;
        case 'NotFoundError':
        case 'ForbiddenError':
        case 'UnauthorizedError':
        case 'BadRequestError': 
            statusCode = err.statusCode
            message = err.message
            break;
    
        default:
            statusCode
            message
            break;
    }

    res.status(statusCode).json({message})
}