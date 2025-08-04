import Course from "../models/CourseModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllCourses = async (req, res) => {
    const { title, limit } = req.query;
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    try {
        const courses = await Course.find(filter).populate("teacherId", "username email profilePic").limit(Number(limit))
        successHandler(res, 200, "All courses fetched", courses)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
export const getSpecificCourse = async (req, res) => {
   try {
        const courses = await Course.findOne(req.params.id).populate("teacherId", "username email profilePic").limit(Number(limit))
        successHandler(res, 200, "All courses fetched", courses)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}


export const getTeacherCourses = async (req, res) => {
    try {
        const courses = await Course.find({ teacherId: req.params.id }).populate("teacherId", "username email profilePic");
        successHandler(res, 200, "course found successfully", courses)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 500, err.message)
    }
}

export const createCourse = async (req, res) => {
    const { title, description } = req.body
    const file = req.file
    try {
        if (!title || !description) return errorHandler(res, 400, "missing fields")
        if (file) {
            const url = await uploadOnCloudinary(file, 'course-images');
            req.body.thumbnail = url.secure_url
        }
        const courseData = await Course({
            title, description, teacherId: req.user.id, thumbnail: req.body.thumbnail
        })
        await courseData.save()
        successHandler(res, 201, "course created successfully", courseData)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
export const deletecourse = async (req, res) => {
    try {
        const courseData = await Course.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "course deleted successfully", courseData)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}

export const updatecourse = async (req, res) => {

    try {
        const file = req.file
        if (file) {
            const url = await uploadOnCloudinary(file, 'course-images');
            req.body.thumbnail = url.secure_url
        }
        const courseData = await Course.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "course updated successfully", courseData)

    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
