import express from "express";
import {signup} from '../controllers/auth.js'
import { signin } from "../controllers/signin.js";
import {signout} from '../controllers/signout.js';
const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/signout",signout);

export default router;