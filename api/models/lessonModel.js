import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
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
        // required: true,
    },
    duration: {
        type: String,
        required: true,
        lowercase: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
},
    { timestamps: true }
)

export default mongoose.model("lessons", lessonSchema)