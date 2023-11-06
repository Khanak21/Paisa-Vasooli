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


export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return next(createError(404, "User not found!"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
  
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } catch (err) {
      next(err);
      console.log(err);
    }
  };


