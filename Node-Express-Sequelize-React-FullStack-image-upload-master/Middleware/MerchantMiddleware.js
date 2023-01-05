const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require('jsonwebtoken')

var checkMerchantAuth = async (req, res, next) => {
    try {
        let token
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer')) {

            token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            // verify Token
            const { merchant_email, status } = jwt.verify(token, SECRETKEY)

            if (status == "Verified") {
                // console.log("hello auth");
                next()
            }else{
                 res.status(StatusCodes.UNAUTHORIZED)
                .send({
                    status: StatusCodes.UNAUTHORIZED,
                    error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
                    response: {"Message":"You are Blocked or not verified contact Admin"},
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
module.exports = checkMerchantAuth