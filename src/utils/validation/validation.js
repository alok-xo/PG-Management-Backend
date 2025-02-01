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
        designation: Joi.string().messages({
            "string.empty": "Designation is required",
        }),
        gender: Joi.string().valid("male", "female", "other").messages({
            "any.only": "Gender must be one of ['male', 'female', 'other']",
        }),
        age: Joi.number().integer().min(0),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least {#limit} characters long",
            "string.empty": "password is required",
        }),
        role: Joi.string().valid('user', 'owner').required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.empty": "Email is required",
            "string.emial": "Invalid email format. Please provide a valid email address.",
        }),
        password: Joi.string().min(6).required().messages({
            "string.min": "Password must be at least {#limit} characters long",
            "string.empty": "password is required",
        }),
    })

    return schema.validate(data);
};

const addPgInfoValidation = (data) => {
    const schema = Joi.object({
        pgName: Joi.string().required().messages({
            "string.empty": "PG name is required",
        }),
        ownerName: Joi.string().required().messages({
            "string.empty": "Owner name is required",
        }),
        location: Joi.object({
            street: Joi.string().required().messages({
                "string.empty": "Street is required",
            }),
            city: Joi.string().required().messages({
                "string.empty": "City is required",
            }),
            state: Joi.string().required().messages({
                "string.empty": "State is required",
            }),
            zipCode: Joi.string().pattern(/^\d{5,6}$/).required().messages({
                "string.empty": "Zip Code is required",
                "string.pattern.base": "Zip Code must be 5 or 6 digits",
            }),
        }).required(),
        contactNumber: Joi.string().pattern(/^\d{10}$/).required().messages({
            "string.empty": "Contact number is required",
            "string.pattern.base": "Contact number must be a 10-digit number",
        }),
        totalRooms: Joi.number().required().messages({
            "number.base": "Total rooms must be a number",
            "any.required": "Total rooms are required",
        }),
        availableRooms: Joi.number().max(Joi.ref('totalRooms')).required().messages({
            "number.max": "Available rooms cannot exceed total rooms",
            "any.required": "Available rooms are required",
        }),
        roomTypes: Joi.array().items(Joi.string()).optional(),
        facilities: Joi.array().items(Joi.string()).optional(),
        rent: Joi.object({
            monthly: Joi.number().required().messages({
                "any.required": "Monthly rent is required",
            }),
            securityDeposit: Joi.number().required().messages({
                "any.required": "Security deposit is required",
            }),
        }).required(),
        rules: Joi.string().optional(),
        reviews: Joi.array().items(
            Joi.object({
                reviewerName: Joi.string().optional(),
                rating: Joi.number().min(1).max(5).optional().messages({
                    "number.min": "Rating must be at least 1",
                    "number.max": "Rating must be at most 5",
                }),
                comment: Joi.string().optional(),
                date: Joi.date().optional(),
            })
        ).optional(),
        images: Joi.array().items(Joi.string()).optional(),
        amenities: Joi.array().items(Joi.string()).optional(),
        bookings: Joi.array().items(
            Joi.object({
                guest: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                    "string.pattern.base": "Invalid guest ID format",
                    "any.required": "Guest ID is required",
                }),
                roomNumber: Joi.number().required().messages({
                    "any.required": "Room number is required",
                }),
                checkInDate: Joi.date().required().messages({
                    "any.required": "Check-in date is required",
                }),
                checkOutDate: Joi.date().greater(Joi.ref('checkInDate')).required().messages({
                    "date.greater": "Check-out date must be after check-in date",
                    "any.required": "Check-out date is required",
                }),
                bookingStatus: Joi.string()
                    .valid("Booked", "Available", "Pending")
                    .default("Available")
                    .messages({
                        "any.only": "Booking status must be one of ['Booked', 'Available', 'Pending']",
                    }),
            })
        ).optional(),
    });

    return schema.validate(data, { abortEarly: false });
};

export default { registerValidation, loginValidation, addPgInfoValidation };