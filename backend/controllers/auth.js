import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

// export const signup = async(req,res,next)=>{
//     try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     const existingUser = await User.findOne({ email: req.body.email });

//     if (existingUser) {
//       // Handle the case where the email is already in use
//       return res.status(400).json({ success: false, message: "Email is already in use." });
//     }
//     const newUser = new User({ ...req.body, password: hash });

//     await newUser.save();
//     res.status(200).json({newUser});
//   } catch (err) {
//     next(err)
//     console.log(err);
//   }
// };

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Check if the email is already in use
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(400).json({ success: false, message: "Email is already in use." });
    }

    // Check if the username is already in use
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: "Username is already in use." });
    }

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).json({ newUser });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

// export const signup = async (req, res) => {
//   // Save User to Database
//   try {
//     const user = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 8),
//     });
//     // res.send({ message: "User registered successfully!" });
//     res.json({user})
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };



// export const signin = async (req, res, next) => {

//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isCorrect = await bcrypt.compare(req.body.password, user.password);

//     if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

//     const token = jwt.sign({ id: user._id }, process.env.JWT);
//     const { password, ...others } = user._doc;

//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json(others);
//   } catch (err) {
//     next(err);
//     console.log(err);
//   }
// };
