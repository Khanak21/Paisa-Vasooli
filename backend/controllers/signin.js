import mongoose from "mongoose";
import User from  "../models/user.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { validationResult } from "express-validator";

export const signin = async (req, res, next) => {

    try {
      const user = await User.findOne({ username: req.body.username });
      // if (!user) return next(createError(404, "User not found!"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) {res.status(200).json({ message: "Password does not match" });}
      
  
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...others } = user._doc;
      res
      .status(200)
      .json(others)
      // res
      //   .cookie("access_token", token, {
      //     httpOnly: true,
      //   })
      //   .status(200)
      //   .json(others);
    } catch (err) {
      console.log(err);
    }
  };

  
// export const signin = async (req, res) => {
//   try {
//     // const user = await User.findOne({
//     //   where: {
//     //     username: req.body.username,
//     //   },
//     // });

//     // if (!user) {
//     //   return res.status(404).send({ message: "User Not found." });
//     // }
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const passwordIsValid = bcrypt.compareSync(
//       req.body.password,
//       user.password
//     );

//     if (!passwordIsValid) {
//       return res.status(401).send({
//         message: "Invalid Password!",
//       });
//     }

//     const token = jwt.sign({ id: user.id },
//       "bezkoder-secret-key",
//                            {
//                             algorithm: 'HS256',
//                             allowInsecureKeySizes: true,
//                             expiresIn: 86400, // 24 hours
//                            });

//     // let authorities = [];
//     // const roles = await user.getRoles();
//     // for (let i = 0; i < roles.length; i++) {
//     //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
//     // }

//     // req.session.token = token;

//     return res.status(200).send({
//       id: user.id,
//       username: user.username,
//       email: user.email,
//     });
//   } catch (error) {
//     return res.status(500).send({ message: error.message });
//   }
// };


