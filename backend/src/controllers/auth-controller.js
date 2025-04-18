const User = require("../models/User");
const { createSecretToken } = require("../util/secret-token");
const bcrypt = require("bcrypt");

module.exports = {
    signup: async (req, res, next) => {
        try {
            const { email, password, username, createdAt } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }
            const user = new User({ email, password, username, createdAt });
            await user.save();
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                path: '/',
                sameSite: 'None',
                domain: `.${process.env.DOMAIN}`,
            });
            res.status(201)
                .json({ message: "User signed in successfully", success: true, user });
            next();
        } catch (error) {
            console.error(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if(!email || !password ){
                return res.json({message:'All fields are required'})
            }
            const user = await User.findOne({ email });
            if(!user){
                return res.json({message:'Incorrect password or email' })
            }
            const auth = await bcrypt.compare(password,user.password)
            if (!auth) {
                return res.json({message:'Incorrect password or email' })
            }
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                httpOnly: false,
                secure: true,
                path: '/',
                sameSite: 'None',
                domain: `.${process.env.DOMAIN}`,
            });
            res.status(201).json({ message: "User logged in successfully", success: true });
            next()
        } catch (error) {
            console.error(error);
        }
    }
};