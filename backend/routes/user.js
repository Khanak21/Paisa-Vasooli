import express from "express";
import {addStock,getStocks,addUrl,getUrls, getInbox, addImg,addBadge,getBadges, deleteStock, delUrl} from '../controllers/user.js'
import {authmiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

//Routes for user api
router.post("/deleteStock/:userId",deleteStock);
router.post("/addStock/:userId",addStock);
router.post("/addUrl/:userId",addUrl);
router.put("/addImg/:userId",addImg);
router.get("/getUrls/:userId",getUrls);
router.get("/getStocks/:userId",getStocks);
router.get("/getInbox/:userId",getInbox);
router.post("/addbadge/:id",addBadge)
router.get("/getBadges/:id",getBadges);
router.put("/deletestock/:userId",deleteStock);router.delete("/deleteFile/:userId",delUrl)


export default router;