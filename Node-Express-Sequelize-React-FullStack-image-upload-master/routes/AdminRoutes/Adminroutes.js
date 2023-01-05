const admin = require('express').Router()

const Admin_verify_user = require('../../controllers/Admin/Admin_verify_user')
const checkAdminAuth = require('../../Middleware/AdminMiddleware')
const userRegistration = require('../../controllers/Customer/userRegister')
const userVerify = require('../../controllers/Customer/userVerify.js')
const FinalRegister = require('../../controllers/Customer/FinalUserRegister.js')
const userLogin = require('../../controllers/Customer/userlogin.js')
const Admin_Blocked_merchant = require('../../controllers/Admin/BlockMerchant')
const Admin_UnBlocked_merchant=require('../../controllers/Admin/UnblockMerchant')
const validationResult = require('../../Validation/validation')



admin.post('/adminRegister', validationResult.customerRegistration, userRegistration)
admin.post('/adminVerify', validationResult.customerVerify, userVerify)
admin.post('/FinalRegister', validationResult.customerRegistration, FinalRegister)
admin.post('/AdminLogin', validationResult.customerLogin, checkAdminAuth, userLogin)


admin.post('/verifyMerchant', validationResult.adminVerify, checkAdminAuth, Admin_verify_user)
admin.post('/blockMerchant', Admin_Blocked_merchant)
admin.post('/unblockMerchant', Admin_UnBlocked_merchant)



module.exports = admin