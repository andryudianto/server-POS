module.exports = function generateCode(req, res, next) {
    const id = req.decoded.id
    let code = Math.floor(Math.random() * Math.floor(4444))
    if (code < 1000) {
        code += 1000
        req.code = code.toString()+id
        next()
    } else {
        req.code = code.toString()+id
        next()
    }
}