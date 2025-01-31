import Joi from 'joi';

// Define the validation schema for the register function
 const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required(),
        lastName: Joi.string().min(1).required(),
        phone: Joi.number().min(10).required().messages({
            "string.empty": "Phone number is required",
            "string.min": "Phone number must be at least {#limit} characters long",
          }),
        email: Joi.string().email().required(),
        designation: Joi.string().min(1).required(),
        gender: Joi.string().valid('male', 'female', 'other').required(),
        age: Joi.number().integer().min(0).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('user', 'admin', 'manager').required()
    });

    return schema.validate(data);
};
export default { registerValidation };