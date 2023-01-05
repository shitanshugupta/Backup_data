const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const db = require("../../models")

const MerchantAddSubCategory = async (req, res) => {
    try {
        const { sub_category_name, category_id } = req.body
        const [user, created] = await db.SubCategories.findOrCreate({
            where: {
                sub_category_name: sub_category_name,
                category_id: category_id
            }
        })
        if (created) {
            res.status(StatusCodes.OK)
                .send({
                    status: StatusCodes.OK,
                    response: getReasonPhrase(StatusCodes.OK),
                    "message": "SubCategory Added",
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
module.exports = MerchantAddSubCategory