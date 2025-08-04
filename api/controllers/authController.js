import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'
import bcrypt, { compare } from "bcryptjs";

export const register = async (req, res) => {

    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) return errorHandler(res, 400, "missing fields")

    try {

        const user = await User.findOne({ $or: [{ email: email }, { userName: username }] })
        if (user) {
            return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
        }
        if (password.length < 8) {
            return errorHandler(res, 400, "Password length should be minimum 8 characters long")
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User({
            username,
            email,
            password: hash,
            role
        })
        let savedUser = await newUser.save();
        return successHandler(res, 201, "user signup successfully", savedUser)
    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}


export const login = async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            return errorHandler(res, 400, "missing fields")
        }
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return errorHandler(res, 404, "Invalid Credentials")
        }
        const isPasswordCorrect = await compare(
            req.body.password, user.password
        );
        if (!isPasswordCorrect) {
            return errorHandler(res, 404, "Invalid Credentials")
        }
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role}, process.env.JWT, {
            expiresIn: process.env.JWT_EXP
        })
        const { password, ...otherDetails } = user._doc
        res.status(200).json({
            success: true,
            status: 200,
            token: token,
            data: { ...otherDetails },
            message: 'user loggedin successfully'
        })
    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}

export const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};


