import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'
import bcrypt, { compare } from "bcryptjs";
import { generateEmail, GenerateToken, VerifyEmailToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'
import mongoose from 'mongoose';


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

        // const newUser = await User({
        //     username,
        //     email,
        //     password: hash,
        //     role
        // })


        const doc = await User({
            username,
            email,
            role,
            password: hash
        })


        const otp = nanoid().slice(0, 6)
        doc.otp = otp
        doc.otpExpires = Date.now() + 60000; // OTP expires in 60s
        doc.isVerified = false



        let savedUser = await doc.save();
        const token = GenerateToken({ data: savedUser, expiresIn: '10m' });



        if (savedUser) {
            const emailSent = await generateEmail(email, otp)

            return successHandler(res, 200, "Signed up Successfully, OTP send to your email address please verify", { ...savedUser, token: token })
        } else {
            return errorHandler(res, 500, "User did not saved")
        }


    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return errorHandler(res, 400, "Missing fields");
        }

        const user = await User.findOne({ username });
        if (!user) {
            return errorHandler(res, 404, "Invalid credentials");
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return errorHandler(res, 404, "Invalid credentials");
        }

        //  Check verification
        if (!user.isVerified) {
            const otp = nanoid().slice(0, 6);
            user.otp = otp;
            user.otpExpires = Date.now() + 60000; // 1 min
            await user.save();

            const token = GenerateToken({ data: { _id: user._id, email: user.email }, expiresIn: '10m' });

            await generateEmail(user.email, otp);

            return successHandler(
                res,
                403,
                "Your account is not verified. OTP has been re-sent to your email. Please verify.",
                { redirectTo: 'otp', token }
            );
        }

        // ✅ User verified → allow login
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT,
            { expiresIn: process.env.JWT_EXP }
        );

        const { password: pass, otp, otpExpires, ...otherDetails } = user._doc;

        return successHandler(res, 200, "User logged in successfully", { ...otherDetails, token })
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
};

export const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};



export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const token = req.header('Authorization');
    try {
        if (!token || !token.startsWith('Bearer')) {
            return errorHandler(res, 401, "No token provided");
        }

        const tokenString = token.split(" ")[1];

        let verifyingUser;
        try {
            verifyingUser = VerifyEmailToken(tokenString);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return errorHandler(res, 401, "Token has expired");
            }
            return errorHandler(res, 400, "Invalid token");
        }

        if (!verifyingUser) {
            return errorHandler(res, 404, "Invalid or expired verification data");
        }


        const userDetails = await User.findOne({
            _id: verifyingUser.result._id,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!userDetails) {
            return errorHandler(res, 400, "OTP is invalid or expired");
        }

        await User.findByIdAndUpdate(userDetails._id, {
            isVerified: true,
            $unset: {
                otp: "",
                otpExpires: ""
            }
        });

        return res.status(200).json({ success: true, message: "OTP verified successfully" });


    } catch (error) {
        console.error("Server Error:", error);
        return errorHandler(res, 500, "Something went wrong");
    }
}