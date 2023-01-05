const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require('jsonwebtoken')
const db = require('../../models/index')
const bcrypt = require('bcrypt')
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const registerUser = await db.Users.findOne({ where: { email: email } })
        if (registerUser) {
            const match = await bcrypt.compare(password, registerUser.password)
            if ((registerUser.email === email) && (match)) {
                let token;
                const SECRETKEY = "SECRETKEY"
                token = jwt.sign({ user_email: email, user_type: registerUser.user_type }, SECRETKEY)
                res.status(StatusCodes.OK)
                    .send({
                        status: StatusCodes.OK,
                        response: getReasonPhrase(StatusCodes.OK),
                        "message": `${user_type} Registered Succesfully`,
                        'token': token
                    })
            } else {
                res.status(StatusCodes.NOT_FOUND)
                    .send({
                        status: StatusCodes.NOT_FOUND,
                        error: getReasonPhrase(StatusCodes.NOT_FOUND),
                        response: { "message": "Email or password Not_Found" },
                    })
            }
        } else {
            res.status(StatusCodes.NOT_FOUND)
                .send({
                    status: StatusCodes.NOT_FOUND,
                    error: getReasonPhrase(StatusCodes.NOT_FOUND),
                    response: { "message": "Email Not_Found" },
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
module.exports = userLogin