const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const db = require('../../models/index.js')
const bcrypt = require('bcrypt')
// const User=require('../models/index')
const FinalRegister = async (req, res) => {
    try {
        const { name, email, password, password_confirmation, user_type } = req.body
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer')) {

            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { user_email, status } = jwt.verify(token, SECRETKEY);
            console.log(user_email, status);
            if ((user_email == email) && (status == "verified")) {
                if (name && email && password && password_confirmation) {
                    if (password === password_confirmation) {
                        try {
                            const salt = await bcrypt.genSalt(10)
                            const hashPassword = await bcrypt.hash(password, salt)
                            const doc = await db.Users.create({
                                name: name,
                                email: email,
                                password: hashPassword,
                                user_type: user_type
                            })
                            const SECRETKEY = "SECRETKEY"

                            const token = jwt.sign({ user_email: email, user_type: user_type }, SECRETKEY)
                            res.status(StatusCodes.OK)
                                .send({
                                    status: StatusCodes.OK,
                                    response: getReasonPhrase(StatusCodes.OK),
                                    "message": `${user_type} Registered Succesfully`,
                                    'token': token
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

                }
            } else {
                res.status(StatusCodes.NOT_FOUND)
                    .send({
                        status: StatusCodes.NOT_FOUND,
                        error: getReasonPhrase(StatusCodes.NOT_FOUND),
                        response: { "message": "Email Not_Found" },
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
    }

    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }

}
module.exports = FinalRegister