import express from "express";
import {sendEmail} from '../controllers/sendEmail.js'

const router = express.Router();

//Routes for bill api
router.post("/sendmail", (req, res) => {
    sendEmail(req.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
  });

export default router;