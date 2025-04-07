const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
    userVerification: async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403)
                .json({message: "Your are not authorized to perform this action"});
        }
        jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
            if (err) {
                return res.status(403)
                    .json({message: "Your are not authorized to perform this action"});
            } else {
                const user = await User.findById(data.id)
                if (user) {
                    next();
                } else {
                    return res.status(403)
                        .json({message: "Your are not authorized to perform this action"});
                }
            }
        })
    }
};