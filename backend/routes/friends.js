import express from "express";
import {sendRequest,acceptRequest} from '../controllers/friends.js'

const router = express.Router();

//Routes for bill api
router.put("/sendRequest/:userId",sendRequest);
router.put("/acceptRequest/:userId",acceptRequest);
export default router;