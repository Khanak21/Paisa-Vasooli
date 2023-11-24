import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import schedule from "node-schedule"
export function sendstartEmail (recievermail){
    console.log(recievermail)
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        name: 'forwardemail.net',
        host: "smtp.forwardemail.net",
        service: "gmail",
        secure: true,
        port:587,
        auth: {
          user: process.env.Email,
          pass: process.env.password,
        },
      });
  
      const mail_configs = {
        from: process.env.Email,
        to: recievermail.reqmail,
        subject: "Welcome to Paisa-Vasooli",
        html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Paisa-Vasooli. Use this website to save your transactions,interact with friends,clearing dues. </p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Bye!</h2>
      <p style="font-size:0.9em;">Regards,<br />Paisa-Vasooli</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Paisa-Vasooli</p>
        <p>India</p>=
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
      };

      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occured` });
        }
        return resolve({ message: "Email sent succesfuly" });
      });
    });
  }