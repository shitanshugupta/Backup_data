const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require('../../models/index.js')
const merchantRegistration = async (req, res) => {
    const { name, email, address, company_name, gst_no, phone_no } = req.body
    try {
        await db.Merchants.create({
            name: name,
            email: email,
            address: address,
            company_name: company_name,
            gst_no: gst_no,
            phone_no: phone_no,
        })
        res.status(StatusCodes.OK)
            .send({
                status: StatusCodes.OK,
                response: getReasonPhrase(StatusCodes.OK),
                "message": `${name} Registered Succesfully`
            })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }
}
module.exports = merchantRegistration