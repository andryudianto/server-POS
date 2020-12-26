const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = class Auth{
    static authentication(req, res, next) {
        const decoded = jwt.verify(req.headers.access_token, 'secret')
        if (!decoded) {
            throw createError(400, 'Invalid Authentication')
        }
        req.decoded = decoded
        next()
    }

    static getIdFromRegistrationCode(req, res, next) {
        let code = req.params.code
        let id = code.slice(4)        
        req.TeacherId = id
        next()
    }
}