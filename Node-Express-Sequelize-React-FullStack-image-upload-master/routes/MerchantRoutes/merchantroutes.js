const merchantRegistration = require('../../controllers/Merchant/merchantRegistraion.js')
const Merchant_Add_product = require('../../controllers/Merchant/merhchant_Add_Product.js')
const merchantSetPassword = require('../../controllers/Merchant/merchantSetPassword')
const MerchantLogin = require('../../controllers/Merchant/merchantLogin')
const MerchantAddCategory = require('../../controllers/Merchant/mechantAddCategory')
const MerchantAddSubCategory = require('../../controllers/Merchant/merchantAddSubCategory')
const MerchantShowUser = require('../../controllers/Merchant/merchantShowUser')
const UpdateProduct = require('../../controllers/Merchant/merchantUpdateProduct.js')
const merchantrouter = require('express').Router()

const validationResult = require('../../Validation/validation')

const checkMerchantAuth = require('../../Middleware/MerchantMiddleware.js')

merchantrouter.post('/MerchantRegister', validationResult.merchantRegistration, merchantRegistration)
merchantrouter.put('/MerchantPassword', validationResult.merchantPassword, checkMerchantAuth, merchantSetPassword)
merchantrouter.post('/MerchantLogin', validationResult.customerLogin, MerchantLogin)
merchantrouter.post('/MerchantAddProduct', validationResult.merchantAddProduct, checkMerchantAuth, Merchant_Add_product)
merchantrouter.post('/MerchantAddCategory', validationResult.merchantAddCategory, checkMerchantAuth, MerchantAddCategory)
merchantrouter.post('/MerchantAddSubCategory', validationResult.merchantAddSubCategory, MerchantAddSubCategory)
merchantrouter.post('/MerchantShowUser', MerchantShowUser)

merchantrouter.patch('/MerchantUpadateProduct', UpdateProduct)


module.exports = merchantrouter