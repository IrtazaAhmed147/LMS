import CourseModel from "../models/CourseModel.js";
import lesson from "../models/lessonModel.js";
import Lesson from "../models/lessonModel.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllLessons = async (req, res) => {
    const { title, limit } = req.query;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    try {
        const lessons = await Lesson.find(filter).populate("courseId","title description teacherId").limit(Number(limit))
        successHandler(res, 200, "All lessons fetched", lessons)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}


export const getCourseLessons = async (req, res) => {
    const { title, limit } = req.query
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };

    try {
        const user = await User.findById(req.user.id);
        if (!user.enrolledCourses.includes(req.params.id)) {
            return res.status(403).json({ message: "You are not enrolled" });
        }
        const lessons = await lesson.find({ courseId: req.params.id, ...filter }).populate("courseId","title description teacherId").limit(Number(limit))
        successHandler(res, 200, "lesson found successfully", lessons)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 500, err.message)
    }
}
export const getSpecificLesson = async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id);
        if (!user.enrolledCourses.includes(req.params.id)) {
            return res.status(403).json({ message: "You are not enrolled" });
        }
        const lessons = await lesson.findOne(req.params.id).populate("courseId","title description teacherId").limit(Number(limit))
        successHandler(res, 200, "lesson found successfully", lessons)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 500, err.message)
    }
}

export const createLesson = async (req, res) => {
    const { title, contentType, duration, courseId } = req.body
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
        await CourseModel.findByIdAndUpdate(courseId, {
            $push: { lessons: lessonData._id }
        })
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
