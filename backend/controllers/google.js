import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const googleAuth = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        // const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
        //   .cookie("access_token", token, {
        //     httpOnly: true,
        //   })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
        });
        const savedUser = await newUser.save();
        // const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
        //   .cookie("access_token", token, {
        //     httpOnly: true,
        //   })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      console.log(err);
    }
  };