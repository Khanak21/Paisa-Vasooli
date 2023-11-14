import express from "express";
import { creategroup,joingroup,getgroups} from "../controllers/groups.js";

const router = express.Router();
router.post("/creategroup",creategroup)
router.post("/joingroup",joingroup)
router.get("/getgroups/:id",getgroups)
export default router;