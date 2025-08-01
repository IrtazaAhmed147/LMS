import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    contentType: {
        type: String,
        required: true,
        lowercase: true,
    },
    contentUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        lowercase: true,
    },
    courseId: {
        type: Array
    },
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)