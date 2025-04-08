const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
    verifyUser: async (req, res) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403)
                .json({message: "Your are not authorized to perform this action"});
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
                if (err) {
                    return res.status(403)
                        .json({message: "Your are not authorized to perform this action"});
                } else {
                    const user = await User.findById(data.id)
                    if (user) {
                        return res.json({ status: true, user: user.username });
                    } else {
                        return res.status(403)
                            .json({message: "Your are not authorized to perform this action"});
                    }
                }
            })

        } catch (e) {
            res.status(400).json({ message: 'Token is not valid' });
        }
    },
    authMiddlewareForAPI: async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
        try {
            const userVerified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(userVerified.id)
            next();
        } catch (e) {
            res.status(400).json({ message: 'Token is not valid' });
        }

    }
};