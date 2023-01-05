const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { Otp } = require('../../models/index.js')
const emailVerify = require('../../services/emailVerify.js')
const jwt = require('jsonwebtoken')
const userVerify = async (req, res) => {
    try {
        const { otp } = req.body
        let token
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer')) {

            token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            // verify Token
            const { user_email } = jwt.verify(token, SECRETKEY)
            const Otp_user = await Otp.findOne({ where: { email: user_email } })
            const status = "verified"
            let new_token;
            new_token = jwt.sign({ user_email: user_email, status: status }, SECRETKEY)
            res.status(StatusCodes.OK)
                .send({
                    status: StatusCodes.OK,
                    response: getReasonPhrase(StatusCodes.OK),
                    "message": "User Verified Successfully",
                    "new_token": new_token
                })
        } else {
            res.status(StatusCodes.UNAUTHORIZED)
                .send({
                    status: StatusCodes.UNAUTHORIZED,
                    response: getReasonPhrase(StatusCodes.UNAUTHORIZED)
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

module.exports = userVerify