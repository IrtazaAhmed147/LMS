import Course from "../models/CourseModel.js";
import User from "../models/userModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllCourses = async (req, res) => {
    const { title, limit, sortBy } = req.query;
    let language = req.query.language;
    let category = req.query.categories;
    const filter = {};
    console.log(req.query.categories);


    console.log(language, `==>> language`);

    if (language) {
        try {
            language = JSON.parse(language); // string -> array
        } catch (err) {
            language = []; // fallback agar parse fail ho jaye
        }
    }
    if (category) {
        try {
            category = JSON.parse(category); // string -> array
        } catch (err) {
            category = []; // fallback agar parse fail ho jaye
        }
    }

    if (title) filter.title = { $regex: title, $options: 'i' };


    if (category && Array.isArray(category) && category.length > 0) {
        filter.category = { $in: category };
    }
    if (language && Array.isArray(language) && language.length > 0) {
        filter.language = { $in: language };
    }
    try {
        const courses = await Course.find(filter).populate("teacherId", "username email profilePic").limit(Number(limit)).sort({ createdAt: sortBy === "Newest" ? -1 : 1 })
        successHandler(res, 200, "All courses fetched", courses)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
export const getSpecificCourse = async (req, res) => {
    try {
        const courses = await Course.findOne({ _id: req.params.id }).populate("teacherId", "username email profilePic").populate("lessons", "title")
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

        errorHandler(res, 500, err.message)
    }
}

export const getEnrolledCourses = async (req, res) => {
    try {
        console.log(req.user);

        const courses = await Course.find({ enrolledStudents: req.user.id }).populate("teacherId", "username email profilePic");
        successHandler(res, 200, "course found successfully", courses)
    }
    catch (err) {

        errorHandler(res, 500, err.message)
    }
}

export const createCourse = async (req, res) => {
    console.log(req.body);

    const { title, description, category, language, subTitle } = req.body
    const file = req.file

    try {
        if (!title || !description || !category || !language || !subTitle) return errorHandler(res, 400, "missing fields")
        if (file) {
            const url = await uploadOnCloudinary(file, 'course-images');
            req.body.thumbnail = url.secure_url
        }
        const courseData = await Course({
            title, description, subTitle, category, language, teacherId: req.user.id, thumbnail: req.body.thumbnail
        })
        await courseData.save()
        await User.findByIdAndUpdate(req.user.id, {
            $push: { createdCourses: courseData._id }
        })
        successHandler(res, 201, "course created successfully", courseData)
    }
    catch (err) {
        errorHandler(res, 500, err.message)
    }
}
export const deletecourse = async (req, res) => {
    try {
        const courseData = await Course.findByIdAndDelete(req.params.id);
        if (!courseData) {
            return errorHandler(res, 404, "Course not found");
        }

        await User.findByIdAndUpdate(courseData.teacherId, {
            $pull: { createdCourses: courseData._id }
        });

        // Remove from all users' enrolledCourses
        await User.findByIdAndUpdate(courseData.teacherId, {
            $pull: { createdCourses: courseData._id }
        });
        await User.updateMany(
            {},
            {
                $pull: {
                    enrolledCourses: { courseId: courseData._id },
                }
            }
        );
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
