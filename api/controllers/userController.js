import mongoose from "mongoose";
import User from "../models/userModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const getAllUsers = async (req, res) => {
      let { username, email, isAdmin, createdCourses } = req.query;
   
  if (createdCourses) {
   
    try {

      createdCourses = JSON.parse(createdCourses); // e.g. ["123","456"]
      createdCourses = createdCourses.map((id) => new mongoose.Types.ObjectId(id));
    } catch (err) {
      console.log('error =>>>', err);
      createdCourses = [];
    }
  }

  const filter = {};

  if (username) filter.username = username;
  if (email) filter.email = email;
  if (isAdmin !== undefined) filter.isAdmin = isAdmin === "true";

  if (createdCourses && createdCourses.length > 0) {
    // students enrolled in any of teacher’s created courses
    // filter.enrolledCourses = { $in: createdCourses };
    filter["enrolledCourses.courseId"] = { $in: createdCourses };

  }

  try {
    const userData = await User.find(filter).populate("enrolledCourses.courseId", "title");
    successHandler(res, 200, "All users fetched", userData);
  } catch (err) {
    console.log(err);
    errorHandler(res, 400, err.message);
  }
};


export const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id);
        successHandler(res, 200, "User found successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        successHandler(res, 200, "User deleted successfully", userData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}

export const updateUser = async (req, res) => {
    
    try {
        const file = req.file
        if(file) {
              const url = await uploadOnCloudinary(file,'user-images');
              req.body.profilePic = url.secure_url
        }
        const userData = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true });
        successHandler(res, 200, "User updated successfully", userData)

    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}
