var bodyParser = require("body-parser");
const router = require("express").Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Joi = require("joi");
const validationResult = {
    //validation for customer registration
    customerRegistration: (req, res, next) => {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),

            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$"))
                .required(),
            password_confirmation: Joi.ref("password"),

            user_type: Joi.string()
                .required(),
        });
        errorHandler(schema, next, req, res);
    },
    customerLogin: (req, res, next) => {
        const schema = Joi.object().keys({

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$"))
                .required(),
        });
        errorHandler(schema, next, req, res);
    },
    customerVerify: (req, res, next) => {
        const schema = Joi.object().keys({

            otp: Joi.string()
                .length(4)
                .pattern(/^[0-9]+$/)
                .required(),

        });
        errorHandler(schema, next, req, res);
    },
    customerAddress: (req, res, next) => {
        const schema = Joi.object().keys({
            AddressLine_1: Joi.string()
                .required(),
            City: Joi.string()
                .required(),
            State: Joi.string()
                .required(),
            Pin_Code: Joi.string()
                .required(),
            Mobile_No: Joi.string()
                .required()
        });
        errorHandler(schema, next, req, res);
    },

    customerCart: (req, res, next) => {
        const schema = Joi.object().keys({
            Product_id: Joi.number()
                .required(),
            Quantity_order: Joi.number()
                .required(),
        });
        errorHandler(schema, next, req, res);
    },

    merchantRegistration: (req, res, next) => {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),

            address: Joi.string()
                .required(),

            company_name: Joi.string()
                .min(3).max(30).required(),

            gst_no: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
                .required(),

            phone_no: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required(),

        });
        errorHandler(schema, next, req, res);
    },
    merchantPassword: (req, res, next) => {
        const schema = Joi.object().keys({

            password: Joi.string()
                .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{3,30}$"))
                .required(),
            password_confirmation: Joi.ref("password"),

        });
        errorHandler(schema, next, req, res);
    },
    merchantAddCategory: (req, res, next) => {
        const schema = Joi.object().keys({

            category_name: Joi.string().min(3).max(30).required(),

        });
        errorHandler(schema, next, req, res);
    },
    merchantAddSubCategory: (req, res, next) => {
        const schema = Joi.object().keys({

            sub_category_name: Joi.string().min(3).max(30).required(),
            category_id: Joi.number()
                .required(),

        });
        errorHandler(schema, next, req, res);
    },
    merchantAddProduct: (req, res, next) => {
        const schema = Joi.object().keys({
            name: Joi.string().min(3).max(30).required(),
            HSN_CODE: Joi.number()
                .required(),
            description: Joi.string()
                .required(),
            quantity: Joi.number()
                .required(),
            price: Joi.number().precision(10, 2)
                .required(),
            discount: Joi.number()
                .required(),
            category_id: Joi.number()
                .required(),
            sub_category_id: Joi.number()
                .required(),
        });
        errorHandler(schema, next, req, res);
    },
    adminVerify: (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required(),
        });
        errorHandler(schema, next, req, res);
    },
    orderProduct: (req, res, next) => {
        const schema = Joi.object().keys({
            Address_id: Joi.number()
                .required(),
            Payment_id: Joi.string()
                .required(),
            Payment_order_id: Joi.string()
                .required(),
            Payment_signature: Joi.string()
                .required()
        });
        errorHandler(schema, next, req, res);
    },
    updateProduct: (req, res, next) => {
        const schema = Joi.object().keys({
            Product_id: Joi.number()
                .required(),
            description: Joi.string(),
            price: Joi.number(),
            quantity: Joi.number(),
            discount: Joi.number()
        });
        errorHandler(schema, next, req, res);
    },
    deleteProduct: (req, res, next) => {
        const schema = Joi.object().keys({
            Product_id: Joi.number()
                .required(),
        });
        errorHandler(schema, next, req, res);
    },

}
function errorHandler(schema, next, req, res) {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        res.status(422).json(error.message);
    } else {
        next();
    }
}

module.exports = validationResult;
