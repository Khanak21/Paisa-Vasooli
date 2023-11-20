import express from "express";
import {addStock,getStocks,addUrl,getUrls, getInbox} from '../controllers/user.js'

const router = express.Router();

//Routes for user api
router.post("/addStock/:userId",addStock);
router.post("/addUrl/:userId",addUrl);
router.get("/getUrls/:userId",getUrls);
router.get("/getStocks/:userId",getStocks);
router.get("/getInbox/:userId",getInbox);


export default router;