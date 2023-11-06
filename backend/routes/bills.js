import express from "express";
import {addTransactions,editTransactions,deleteTransactions,getTransactionss} from '../controllers/transactions.js'
const router = express.Router();
import { verifyToken } from "../Verify.js";

router.post("/",addTransactions);
router.put("/:id",editTransactions);
router.delete("/:id",deleteTransactions);
router.get("/:VideoId",getTransactionss);
export default router;