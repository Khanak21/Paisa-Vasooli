import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ username: req.body.username });
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) {res.status(200).json({ message: "Password does not match" });}
      
      const { password, ...others } = user._doc;
      res
      .status(200)
      .json(others)
    } catch (err) {
      console.log(err);
    }
  };

  
