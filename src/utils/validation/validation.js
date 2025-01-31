import Joi from 'joi';

// Define the validation schema for the register function
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(30).required().messages({
            "string.empty": "First name is required",
            "string.min": "First name must be at least {#limit} characters long",
            "string.max": "First name must be at most {#limit} characters long",
        }),
        lastName: Joi.string().min(2).max(30).messages({
            "string.min": "Last name must be at least {#limit} characters long",
            "string.max": "Last name must be at most {#limit} characters long",
        }),
        phone: Joi.number().min(10).required().messages({
            "string.empty": "Phone number is required",
            "string.min": "Phone number must be at least {#limit} characters long",
        }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format. Please provide a valid email address.",
        }),
        designation: Joi.string().messages({ // Removed .valid() for free-text input
            "string.empty": "Designation is required", // Optional: Add if designation is required
        }),
        gender: Joi.string().valid("male", "female", "other").messages({
            "any.only": "Gender must be one of ['male', 'female', 'other']",
        }),
        age: Joi.number().integer().min(0),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least {#limit} characters long",
            "string.empty": "password is required",
        }),
        role: Joi.string().valid('user', 'admin', 'manager').required()
    });

    return schema.validate(data);
};
export default { registerValidation };