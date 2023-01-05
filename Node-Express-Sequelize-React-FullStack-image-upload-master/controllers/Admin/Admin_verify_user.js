const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const nodemailer = require("nodemailer");
const db = require('../../models/index.js')
const jwt = require('jsonwebtoken')

const Admin_verify_user = async (req, res) => {
    try {
        const { email } = req.body
        await db.Merchants.update({ status: "Verified" }, {
            where: {
                email: email
            }
        })
        const MerchantRow = await db.Merchants.findOne({
            where: {
                email: email
            }
        })
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shitanshu@appventurez.com",
                pass: "gihzbwwunuqssbrk",
            },
        });
        SECRETKEY = "SECRETKEY"
        const token = jwt.sign({ merchant_email: email, status: "Verified", merchant_id: MerchantRow.id }, SECRETKEY)
        let mailOptions = {
            from: "shitanshu@appventurez.com",
            to: email,
            subject: "Token Send",
            text: token,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(StatusCodes.BAD_GATEWAY)
                    .send({
                        status: StatusCodes.BAD_GATEWAY,
                        error: getReasonPhrase(StatusCodes.BAD_GATEWAY),
                        response: {},
                    })
            } else {
                res.status(StatusCodes.OK)
                    .send({
                        status: StatusCodes.OK,
                        response: getReasonPhrase(StatusCodes.OK),
                        "message": "Merchant Verified Successfully",
                        "Token": token
                    })
                console.log("Email sent: ");
            }
        });
        console.log(email)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
                response: {},
            })
    }

}
module.exports = Admin_verify_user
