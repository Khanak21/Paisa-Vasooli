import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";


export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const signout = (req, res, next) => {
    try {
      res.clearCookie("access_token");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      next(err);
      console.log(err);
    }
  };