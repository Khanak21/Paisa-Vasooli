import express from "express";
import {sendEmail} from '../controllers/sendEmail.js'
import { sendstartEmail } from "../controllers/welcomemail.js";
import { recurringbillemail } from "../controllers/sendrecurring.js";
const router = express.Router();

//Routes for bill api
router.post("/sendmail", (req, res) => {
    sendEmail(req.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
  });

  router.post("/sendstartmail",(req,res)=>{
     sendstartEmail(req.body)
     .then((response) => res.send(response.message))
     .catch((error) => res.status(500).send(error.message));
  })
router.post("/sendmailrecurring",recurringbillemail)


export default router;