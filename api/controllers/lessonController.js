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
        const lessons = await Lesson.find(filter).populate("courseId", "title description teacherId").limit(Number(limit))
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

        const isEnrolled = user.enrolledCourses.find((course) => {
            return course.courseId.toString() === req.params.id
        })
        
        
        const isCreator = user.createdCourses.includes(req.params.id);
        const isAdmin = req.user.role === "admin";
        
        if (!isEnrolled && !isCreator && !isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }
        const lessons = await lesson.find({ courseId: req.params.id, ...filter }).populate("courseId", "title description teacherId").sort({ createdAt: -1 }).limit(Number(limit))
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
        const isEnrolled = user.enrolledCourses.includes(req.params.id);
        const isCreator = user.createdCourses.includes(req.params.id);
        const isAdmin = req.user.role === "admin";

        if (!isEnrolled && !isCreator && !isAdmin) {
            return res.status(403).json({ message: "Access denied" });
        }
        const lessons = await lesson.findOne(req.params.id).populate("courseId", "title description teacherId").limit(Number(limit))
        successHandler(res, 200, "lesson found successfully", lessons)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 500, err.message)
    }
}

export const createLesson = async (req, res) => {
    const { title, contentType, duration, courseId } = req.body
    
    const files = req.files
    try {
        if (!title || !contentType || !duration || !courseId) return errorHandler(res, 400, "missing fields")

        let contentUrls = [];

        if (files && files.length > 0) {
            for (const file of files) {
                const result = await uploadOnCloudinary(file, "lesson-content");
                if (result?.secure_url) {
                    contentUrls.push(result.secure_url);
                }
            }
        }
        const lessonData = new Lesson({
            title,
            contentType,
            contentUrl: contentUrls,
            duration,
            courseId,
        });
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
        await CourseModel.findByIdAndUpdate(lessonData.courseId, {
            $pull: { lessons: lessonData._id }
        })
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
export const lessonComplete = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params
        const user = await User.findById(req.user.id);

        if (!user) return errorHandler(res, 404, "User not found");

        // Find the enrolled course
        const enrolledCourse = user.enrolledCourses.find((course) =>
            course.courseId.toString() === courseId
        );
        if (!enrolledCourse)
            return errorHandler(res, 400, "User is not enrolled in this course");

        // Avoid duplicate lesson entries
        if (!enrolledCourse.completedLessons.includes(lessonId)) {
            enrolledCourse.completedLessons.push(lessonId);
        }

        // Save updated user
        await user.save();

        successHandler(res, 200, "Lesson marked as completed");
    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}