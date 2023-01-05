const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models/index")
const jwt = require("jsonwebtoken")
const userAddress = async (req, res) => {
    try {
        const { AddressLine_1, City, State, Pin_Code, Mobile_No } = req.body
        const { authorization } = req.headers
        if ((authorization) && (authorization.startsWith('Bearer'))) {
            const token = authorization.split(' ')[1]
            const SECRETKEY = "SECRETKEY"
            const { user_email } = jwt.verify(token, SECRETKEY)
            const { id } = await db.Users.findOne({
                where: {
                    email: user_email
                }
            })
            await db.Addresss.create({
                AddressLine_1: AddressLine_1,
                City: City,
                State: State,
                Pin_Code: Pin_Code,
                Mobile_No: Mobile_No,
                User_id: id
            })
            res.status(StatusCodes.OK)
                .send({
                    status: StatusCodes.OK,
                    response: getReasonPhrase(StatusCodes.OK),
                    "message": `${user_type} added Address Succesfully`,
                })
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

module.exports = userAddress