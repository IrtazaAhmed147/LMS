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
    const { courseId } = req.body;
    const titles = req.body.titles;  // array of titles
    const files = req.files;         // multer → array of files

    try {
        // agar ek hi title ho to string milega, usko array banao
        const titlesArray = Array.isArray(titles) ? titles : [titles];

        let lessonData = [];

        for (let i = 0; i < titlesArray.length; i++) {
            const title = titlesArray[i];
            const file = files[i];

            let fileUrl = "";
            if (file) {
                const result = await uploadOnCloudinary(file, "lesson-content");
                fileUrl = result.secure_url;
            }

            lessonData.push({
                courseId,
                title,
                contentUrl: fileUrl,
            });
        }


        // save all lessons
        const insertedLessons = await Lesson.insertMany(lessonData);

        // get lesson IDs
        const lessonIds = insertedLessons.map((l) => l._id);

        // attach lessons to course
        await CourseModel.findByIdAndUpdate(courseId, {
            $push: { lessons: { $each: lessonIds } },
        });

        res.status(201).json({
            success: true,
            message: "Lessons created successfully",
            data: insertedLessons,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



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
    console.log(req.body);
    console.log(req.params.id);
    
    try {
        const file = req.file;

        const updateData = { ...req.body }; // copy body fields

        if (file) {
            const result = await uploadOnCloudinary(file, "lesson-content");
            updateData.contentUrl = result.secure_url; // store new url
        }

        const lessonData = await Lesson.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!lessonData) {
            return errorHandler(res, 404, "Lesson not found");
        }

        successHandler(res, 200, "Lesson updated successfully", lessonData);
    } catch (err) {
        console.error(err);
        errorHandler(res, 500, err.message);
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