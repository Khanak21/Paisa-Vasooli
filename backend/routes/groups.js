import express from "express";
import { creategroup,joingroup,getgroups,getmembers,splitBill, markPaid, markApproved,deleteGroup, simplifyDebt, approveDebt, getDebts} from "../controllers/groups.js";

const router = express.Router();
router.post("/creategroup",creategroup)
router.post("/joingroup",joingroup)
router.get("/getgroups/:id",getgroups)
router.get("/getmembers/:id",getmembers)
router.post("/splitbill",splitBill)
router.put("/markpaid/:id",markPaid)
router.put("/markapproved/:id",markApproved)
router.post("/simplifyDebt/:id",simplifyDebt)
router.post("/approveDebt/:id",approveDebt)

router.get("/getDebts/:groupId",getDebts)
router.delete("/deleteGroup/:id",deleteGroup)
export default router;