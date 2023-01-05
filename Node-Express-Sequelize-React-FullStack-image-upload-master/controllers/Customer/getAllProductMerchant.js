const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { Products } = require("../../models/index")
const db = require("../../models/index")

const getAllProducts = async (req, res) => {
    const { page, limit } = req.query
    const products = await db.Products.findAll({
        attributes: ['Name', 'quantity', 'price', 'discount', 'Stocks'],
        include: [

            { model: db.Merchants, attributes: ['name', 'company_name'] },
            { model: db.Categories, attributes: ['category_name'] },
            { model: db.SubCategories, attributes: ['sub_category_name'] }

        ],
        offset: (page - 1) * limit,
        limit: +limit,

    })
    console.log(products);
    for (let i = 0; i < products.length; i++) {
        if (products[i].dataValues.Stocks >= 10) {
            products[i].dataValues.Stocks = "In Stock"
        } else if (products[i].dataValues.Stocks >= 0 && products[i].dataValues.Stocks < 10) {
            products[i].dataValues.Stocks = `Last ${products[i].dataValues.Stocks} items Left`
        } else {
            products[i].dataValues.Stocks = "Out of Stock"
        }
    }
    res.status(StatusCodes.OK)
        .send({
            status: StatusCodes.OK,
            response: getReasonPhrase(StatusCodes.OK),
            "message": products
        })
}

module.exports = getAllProducts