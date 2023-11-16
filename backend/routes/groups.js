import express from "express";
<<<<<<< Updated upstream
import { creategroup,joingroup,getgroups,getmembers,splitBill, markPaid} from "../controllers/groups.js";
=======
import { creategroup,joingroup,getgroups,getmembers,deleteGroup} from "../controllers/groups.js";
>>>>>>> Stashed changes

const router = express.Router();
router.post("/creategroup",creategroup)
router.post("/joingroup",joingroup)
router.get("/getgroups/:id",getgroups)
router.get("/getmembers/:id",getmembers)
<<<<<<< Updated upstream
router.post("/splitbill",splitBill)
router.put("/markpaid/:id",markPaid)


=======
router.delete("/deleteGroup/:id",deleteGroup)
>>>>>>> Stashed changes
export default router;