import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import schedule from "node-schedule"

import { sendEmail } from "./sendEmail.js";

export const recurringbillemail =async(req,res)=>{
    const recurringcat = req.body.recurringcat
    const date = req.body.duedate
    const weekdate = new Date(date)
    const dayOfMonth = parseInt(date.split("-")[0]);
    const currdate = new Date();
    try{
        if(recurringcat==="weekly"){
            schedule.scheduleJob({hour:1,minute:10,dayOfWeek:weekdate.getDay()},sendEmail)   
        }
        else if(recurringcat ==="monthly" && dayOfMonth >= 1 && dayOfMonth <= 31){
            schedule.scheduleJob({hour:1,minute:10,dayOfMonth},sendEmail)
        }
        else if(recurringcat==="daily"){
            schedule.scheduleJob({hour:1,minute:10},sendEmail)
        }
        else{
            sendEmail()
        }
    }catch(err){
        console.log(err)
    }
    
}