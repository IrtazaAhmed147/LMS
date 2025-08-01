import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
    },
    enrolledCourses: {
        type: Array
    },
    createdCourses: {
        type: Array
    },
    profilePic: {
        type: String,
    }
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)