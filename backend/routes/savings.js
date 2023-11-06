import express from "express";
import {addSaving,editSaving,deleteSaving,getSavings} from '../controllers/savings.js'

const router = express.Router();
// import { verifyToken } from "../Verify.js";

//Routes for savings api
router.post("/addSaving",addSaving);
router.put("/editSaving/:id",editSaving);
router.delete("/deleteSaving/:id",deleteSaving);
router.get("/getSavings/:userId",getSavings);
export default router;