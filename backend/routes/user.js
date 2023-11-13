import express from "express";
import {addStock,getStocks} from '../controllers/user.js'

const router = express.Router();

//Routes for user api
router.post("/addStock/:userId",addStock);
router.get("/getStocks/:userId",getStocks);

export default router;