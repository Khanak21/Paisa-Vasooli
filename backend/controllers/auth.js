import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { validationResult } from "express-validator";
 
const jwtSecret=process.env.JWT
export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const signup = async (req, res, next) => {
  try {
    console.log("Signup Request Body:", req.body);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Check if the email is already in use
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      // console.log("Email already in use",existingUserEmail);
      return res.status(400).json({ success: false, message: "Email is already in use." });
    }

    // Check if the username is already in use
    const existingUsername = await User.findOne({ username: req.body.username });
    if (existingUsername) {
      // console.log("Username already in use",existingUsername);
      return res.status(400).json({ success: false, message: "Username is already in use." });
    } 

    const newUser = await User.create({ ...req.body, password: hash });
    console.log("New User Created:", newUser);
    if(!newUser)
      {
        res.status(404).json({message:"User can't be created try again"})
      }
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, jwtSecret);
    newUser.token = token;

    await newUser.save();

    console.log("Signed Up User:", newUser);
    res.status(200).json({ newUser, token });
  } catch (err) {
    console.error("Error during signup:", err);
    next(err);
  }
};