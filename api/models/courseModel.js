import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
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
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    }],
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
    { timestamps: true }
)

export default mongoose.model("Course", courseSchema)