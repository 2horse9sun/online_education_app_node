const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');

module.exports = (req, res, next) => {
    if (req.session.username) {
        next()
        return
    }
    res.json(
        new ErrorResponse('Not login')
    )
}