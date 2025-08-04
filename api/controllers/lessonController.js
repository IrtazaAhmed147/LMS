import lesson from "../models/lessonModel.js";
import Lesson from "../models/lessonModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

// export const getAllLessons = async (req, res) => {
//     const { title, limit } = req.query;
//     const filter = {};
//     if (title) filter.title = { $regex: title, $options: 'i' };
//     try {
//         const lessons = await lesson.find(filter).populate("teacherId", "username email profilePic").limit(Number(limit))
//         successHandler(res, 200, "All lessons fetched", lessons)
//     }
//     catch (err) {
//         errorHandler(res, 500, err.message)
//     }
// }


export const getCourseLessons = async (req, res) => {
    const {title, limit} = req.query
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };

    try {
        const lessons = await lesson.find({ courseId: req.params.id, ...filter }).populate("courseId").limit(Number(limit))
        successHandler(res, 200, "lesson found successfully", lessons)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 500, err.message)
    }
}

export const createLesson = async (req, res) => {
    const { title, contentType,  duration, courseId } = req.body
    const file = req.file
    try {
        if (!title || !contentType || !duration || !courseId) return errorHandler(res, 400, "missing fields")
        if (file) {
            const url = await uploadOnCloudinary(file, 'lesson-content');
            req.body.contentUrl = url.secure_url
        }
        const lessonData = await Lesson({
            title, contentType, contentUrl: req.body.contentUrl, duration, courseId
        })
        await lessonData.save()
        successHandler(res, 201, "lesson created successfully", lessonData)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
export const deleteLesson = async (req, res) => {
    try {
        const lessonData = await Lesson.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "lesson deleted successfully", lessonData)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}

export const updateLesson = async (req, res) => {

    try {
        const lessonData = await Lesson.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "lesson updated successfully", lessonData)

    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
