import Course from "../models/CourseModel.js"
import User from "../models/userModel.js"
import { errorHandler, successHandler } from "../utils/responseHandler.js"

export const enrollStudent = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const course = await Course.findById(courseId);
        if (!course) return errorHandler(res, 404, "Course not found");
        if (course.enrolledStudents.includes(userId)) {
            return errorHandler(res, 400, "You are already enrolled in this course");
        }

        await Course.findByIdAndUpdate(courseId, {
            $push: { enrolledStudents: userId }
        })
        await User.findByIdAndUpdate(userId, {
            $push: { enrolledCourses: { courseId } }
        });

        successHandler(res, 200, "Student enrolled in course")
    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}