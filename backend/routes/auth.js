import express from "express";
import {signup} from '../controllers/auth.js'
import { signin } from "../controllers/signin.js";
import {signout} from '../controllers/signout.js';
import { googleAuth } from "../controllers/google.js";
const router = express.Router();

//Routes for auth api
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/signout",signout);
router.post("/google",googleAuth);

export default router;