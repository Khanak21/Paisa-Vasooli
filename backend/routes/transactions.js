import express from "express";
import {addTransaction,editTransaction,deleteTransaction,getTransactions,getTransactionsByCategory,getTransactionsByDate,getTransactionsByMonth,getTransactionsByYear, getTotalStats} from '../controllers/transactions.js'

const router = express.Router();
// import { verifyToken } from "../Verify.js";

//Routes for transaction api
router.post("/addTransaction",addTransaction);
router.put("/editTransaction/:id",editTransaction);
router.delete("/deleteTransaction/:id",deleteTransaction);
router.get("/getTransactions/:userId",getTransactions);
router.get("/getTransactionsByCategory/:userId",getTransactionsByCategory);
router.get("/getTransactionsByDate/:userId",getTransactionsByDate);
router.get("/getTransactionsByMonth/:userId",getTransactionsByMonth);
router.get("/getTransactionsByYear/:userId",getTransactionsByYear);
router.get("/getTotalStats/:userId",getTotalStats);


export default router;