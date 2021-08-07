 const Joi = require('joi');
// //register Validation

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: false } }),
        address: Joi.string(),
        mobile_no: Joi.number(),
        otp: Joi.number(),
        validity: Joi.date(),
        status: Joi.boolean()
    })
    return schema.validate(data);
};
module.exports.registerValidation = registerValidation;


  
