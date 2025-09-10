import Course from "../models/courseModel.js";
import lessonModel from "../models/lessonModel.js";
import User from "../models/userModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getDashboardStat = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        const totalLessons = await lessonModel.countDocuments();
        const totalInstructors = await User.countDocuments({ role: "teacher" });
        const totalStudents = await User.countDocuments({ role: "student" });

        successHandler(res, 200, "Stats fetched successfully", {
            totalCourses,
            totalLessons,
            totalInstructors,
            totalStudents,
        })
    } catch (error) {
        errorHandler(res, 500, error.message)
    }
} 