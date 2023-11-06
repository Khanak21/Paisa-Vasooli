import express from "express";
import {addBill,editBill,deleteBill,getBills} from '../controllers/transactions.js'

const router = express.Router();
// import { verifyToken } from "../Verify.js";

//Routes for bill api
router.post("/addBill",addBill);
router.put("/editBill/:id",editBill);
router.delete("/deleteBill/:id",deleteBill);
router.get("/getBills/:userId",getBills);
export default router;