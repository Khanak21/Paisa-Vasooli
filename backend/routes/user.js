import express from "express";
import {addStock,getStocks,addUrl,getUrls,deleteStock,getInbox,addImg,addBadge,getBadges} from '../controllers/user.js'

const router = express.Router();

//Routes for user api
router.post("/addStock/:userId",addStock);
router.post("/addUrl/:userId",addUrl);
router.put("/addImg/:userId",addImg);
router.get("/getUrls/:userId",getUrls);
router.get("/getStocks/:userId",getStocks);
router.get("/getInbox/:userId",getInbox);
router.post("/addbadge/:id",addBadge)
router.get("/getBadges/:id",getBadges);
router.put("/deletestock/:userId",deleteStock);

export default router;