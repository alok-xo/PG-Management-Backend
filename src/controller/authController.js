import User from '../models/user/userauth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../models/auth.js';
import validation from "../utils/validation/validation.js"
import AppError from '../utils/error/error.js';
import { StatusCodes } from 'http-status-codes';
import Logger from '../utils/logger/logger.js';


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { error } = validation.loginValidation(req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messsage: error.details[0].message,
                success: false,
                code: 400
            })
        }

        const user = await auth.findOne({ email });

        const payload = {
            userId: user._id,
            email: user.email
        }

        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password.trim(), user.password);

        if (!isMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email or password are incorrect",
                success: false,
                code: 400,
            });
        }

        const secret = process.env.JWT_SECRET;

        const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });

        const refreshToken = jwt.sign(payload, secret, { expiresIn: '5d' });

        res.status(StatusCodes.OK).json({
            message: "Login successful",
            code: 200,
            success: true,
            data: user,
            role: user.role,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (err) {
        Logger.error(err.message);
        let statusCode = 500;
        let message = "Internal Server Error";
        if (err instanceof AppError) {
            statusCode = err.statusCode;
            message = err.message;
        }
        return res.status(statusCode).json({
            message,
            success: false,
            code: statusCode
        });
    }
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, designation, gender, age, password, role } = req.body;

        const { error } = validation.registerValidation(req.body);

        if (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                messsage: error.details[0].message,
                success: false,
                code: 400
            })
        }

        const existingUser = await auth.findOne({ $or: [{ email }, { phone }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "Email already exists",
                    success: false,
                    code: 400
                })
            }
            if (existingUser.phone === phone) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: "Phone already exists",
                    success: false,
                    code: 400
                })
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new auth({
            firstName,
            lastName,
            phone,
            email,
            designation,
            gender,
            age,
            password: hashedPassword,
            role
        })

        await newUser.save();

        res.status(StatusCodes.CREATED).json({
            message: 'Registered successfully',
            success: true,
            code: 201,
            data: newUser
        });

    } catch (err) {
        Logger.error(err.message);
        let statusCode = 500;
        let message = "Internal Server Error";
        if (err instanceof AppError) {
            statusCode = err.statusCode;
            message = err.message;
        }
        return res.status(statusCode).json({
            message,
            success: false,
            code: statusCode
        });
    }
};