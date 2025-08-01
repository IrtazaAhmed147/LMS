import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        lowercase: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    teacherId: {
        type: String,
        required: true,
        lowercase: true,
    },
    lessons: {
        type: Array
    },
    enrolledStudents: {
        type: Array
    }
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema)