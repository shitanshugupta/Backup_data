const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');
const { Products, Sequelize } = require("../../models/index");
const db = require("../../models/index");
const SearchProduct = async (req, res) => {
    const key = req.query.key
    console.log(key);
    // const search = await db.Products.findAll({
    //     attributes: ['Name', 'Stocks'],
    //     "$or": [
    //         { "Name": { $regex: req.query.key } },
    //         { "Description": { $regex: req.query.key } }
    //     ],



    // include:[
    //     {model:db.Categories,attributes:['category_name']},
    //     {model:db.SubCategories,attributes:['sub_category_name']}
    // ]


    // })
    const search = await db.Products.findAll({
        attributes: ['Name', 'Description', 'Stocks'],
        where: {
            [Sequelize.Op.or]: [
                {
                    Name: {
                        [Sequelize.Op.like]: `%${key}%`
                    }
                },
                {
                    Description: {
                        [Sequelize.Op.like]: `%${key}%`
                    }
                }
            ]
        }
    })
    console.log(search);
    res.send(search)
}
module.exports = SearchProduct