import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const refreshToken = req.headers["refresh-token"];

        if (!authHeader) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are not authenticated" });
        }

        const secret = process.env.JWT_SECRET;

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log("errName", err.name);

                if (err.name === "TokenExpiredError") {
                    if (!refreshToken) {
                        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid refresh token" });
                    }
                    jwt.verify(refreshToken, secret, (err, user) => {
                        if (err) {
                            return res.status(StatusCodes.UNAUTHORIZED).json({
                                message: "Invalid refresh token"
                            })
                        }
                        const newAccessToken = jwt.sign({
                            userId: user._id, email: user.email
                        }, secret, { expiresIn: "15m" })

                        req.user = { userData: user, newAccessToken };
                        next();
                    });
                } else {
                    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid access token" });
                }
            } else {
                res.user = { userData: user };
                next();
            }
        });

    } catch (error) {
        console.error("error", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error",
            success: false,
            code: 500
        })
    }
}


export default { auth };