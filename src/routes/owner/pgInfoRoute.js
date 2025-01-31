import express from 'express';
import { addPgInfo, getAllPgInfo, updatePgInfo, deletePgInfo } from "../../controller/owner/pgInfo.js"


const router = express.Router();

router.post("/add-pgInfo", addPgInfo);
router.get("/get-allPgInfo", getAllPgInfo);
router.patch("/update-pgInfo/:id", updatePgInfo);
router.delete("/delete-pgInfo/:id", deletePgInfo);


export default router;