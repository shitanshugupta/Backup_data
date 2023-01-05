const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require("jsonwebtoken")
const db = require("../../models/index.js")
const bcrypt = require('bcrypt')

const merchantSetPassword = async (req, res) => {
    try {
        const { password, password_confirmation } = req.body
        const { authorization } = req.headers
        if ((authorization) && authorization.startsWith('Bearer')) {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { merchant_email, status } = jwt.verify(token, SECRETKEY)
            const doc = await db.Merchants.findOne({
                where: {
                    email: merchant_email
                }
            })
            if (doc.password === null) {
                if (password && password_confirmation) {
                    if (password === password_confirmation) {
                        try {
                            const salt = await bcrypt.genSalt(10)
                            const hashPassword = await bcrypt.hash(password, salt)
                            const doc = await db.Merchants.update({ password: hashPassword }, {
                                where: {
                                    email: merchant_email
                                }
                            })
                            res.status(StatusCodes.OK)
                                .send({
                                    status: StatusCodes.OK,
                                    response: getReasonPhrase(StatusCodes.OK),
                                    "message": "Password Updated Succesfully",
                                })
                        }
                        catch (error) {
                            res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                                .send({
                                    status: StatusCodes.INTERNAL_SERVER_ERROR,
                                    error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                                    response: {},
                                })
                        }
                    } else {
                        res.status(StatusCodes.NOT_FOUND)
                            .send({
                                status: StatusCodes.NOT_FOUND,
                                error: getReasonPhrase(StatusCodes.NOT_FOUND),
                                response: { "message": "Password Mismatch" },
                            })
                    }
                } else {
                    res.status(StatusCodes.BAD_REQUEST)
                        .send({
                            status: StatusCodes.BAD_REQUEST,
                            error: getReasonPhrase(StatusCodes.BAD_REQUEST),
                            response: { "message": "All Fields Required" },
                        })
                }
            } else {
                res.status(StatusCodes.NOT_ACCEPTABLE)
                    .send({
                        status: StatusCodes.NOT_ACCEPTABLE,
                        error: getReasonPhrase(StatusCodes.NOT_ACCEPTABLE),
                        response: { "message": "Password Once set Can't be modified" },
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
module.exports = merchantSetPassword