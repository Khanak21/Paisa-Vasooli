import express from "express";
import {addTransaction,editTransaction,deleteTransaction,getTransactions, getTotalStats,getTransactionsByFilter,getWeeklyTransaction,getMonthlyTransaction,getYearlyTransaction,getCategoryWiseTransaction} from '../controllers/transactions.js'

const router = express.Router();
router.post("/addTransaction",addTransaction);
router.put("/editTransaction/:id",editTransaction);
router.delete("/deleteTransaction/:id",deleteTransaction);
router.get("/getTransactions/:userId",getTransactions);
router.get("/getTotalStats/:userId",getTotalStats);
router.post("/getTransactionsByFilter",getTransactionsByFilter);
router.get("/getWeeklyTransaction/:userId",getWeeklyTransaction);
router.get("/getMonthlyTransaction/:userId",getMonthlyTransaction);
router.get("/getYearlyTransaction/:userId",getYearlyTransaction);
router.get("/getCategoryWiseTransaction/:userId",getCategoryWiseTransaction);






export default router;