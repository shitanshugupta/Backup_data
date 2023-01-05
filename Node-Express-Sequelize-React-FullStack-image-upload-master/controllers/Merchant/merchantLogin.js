const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models/index.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const MerchantLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const registerMerchant = await db.Merchants.findOne({ where: { email: email } })
        if (registerMerchant) {
            const match = await bcrypt.compare(password, registerMerchant.password)
            if ((registerMerchant.email === email) && (match)) {
                let token;
                const SECRETKEY = "SECRETKEY"
                token = jwt.sign({ merchant_id: registerMerchant.id }, SECRETKEY)
                res.status(StatusCodes.OK)
                    .send({
                        status: StatusCodes.OK,
                        response: getReasonPhrase(StatusCodes.OK),
                        "message": "Merchant Login Succesfully",
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
                    response: { "message": "Merchant Not_Found" },
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

module.exports = MerchantLogin