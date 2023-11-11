import express from "express";
import {addBill,editBill,deleteBill,getBills} from '../controllers/bills.js'

const router = express.Router();

//Routes for bill api
router.post("/addBill",addBill);
router.put("/editBill/:id",editBill);
router.delete("/deleteBill/:id",deleteBill);
router.get("/getBills/:userId",getBills);
export default router;