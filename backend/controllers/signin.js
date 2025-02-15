import User from  "../models/user.js"
import bcrypt from "bcryptjs";
export const signin = async (req, res, next) => {
  
    console.log(req.body);
    try {
      const user = await User.findOne({ username: req.body.username });
  
      const isCorrect = bcrypt.compare(req.body.password, user.password);
      console.log(isCorrect);
  
      if (!isCorrect) {res.status(200).json({ message: "Password does not match" });}
      
      const { password, ...others } = user._doc;
      res
      .status(200)
      .json(others) 
    } catch (err) {
      console.log(err);
    }
  };

  
