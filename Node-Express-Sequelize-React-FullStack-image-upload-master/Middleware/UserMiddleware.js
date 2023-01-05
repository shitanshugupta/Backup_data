const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require('jsonwebtoken')

var checkUserAuth = async (req, res, next) => {
    try {
        let token
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            // verify Token
            const { user_email, user_type } = jwt.verify(token, SECRETKEY)
            if (user_type == "User") {
                // console.log("hello auth");
                next()
            } else {
                res.status(StatusCodes.UNAUTHORIZED)
                    .send({
                        status: StatusCodes.UNAUTHORIZED,
                        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                        response: {},
                    })
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED)
                .send({
                    status: StatusCodes.UNAUTHORIZED,
                    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    response: {},
                })
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }
}

module.exports = checkUserAuth