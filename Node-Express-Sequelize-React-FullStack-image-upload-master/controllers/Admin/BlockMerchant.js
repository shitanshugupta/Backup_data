const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const nodemailer = require("nodemailer");
const db = require('../../models/index.js')
const jwt = require('jsonwebtoken')

const Admin_Blocked_merchant = async (req, res) => {
    try {
        const { email } = req.body
        await db.Merchants.update({ status: "Blocked" }, {
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
        let mailOptions = {
            from: "shitanshu@appventurez.com",
            to: email,
            subject: "Blocked...",
            text: "You have been Blocked..Contact Admin",
        };
        const link = `http://localhost:8080/api/admin/unblockMerchant`
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
                        "message": "Merchant Blocked Successfully",
                        "link": `<a href=${link}>Click to Unblock</a>`
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

module.exports = 
    Admin_Blocked_merchant

