import express from 'express';
import { addPgInfo, getAllPgInfo, updatePgInfo, deletePgInfo } from "../../controller/owner/pgInfo.js"
import middleware from "../../utils/middleware/auth.js"

const router = express.Router();

router.post("/add-pgInfo", addPgInfo);
router.get("/get-allPgInfo", middleware.auth, getAllPgInfo);
router.patch("/update-pgInfo/:id", updatePgInfo);
router.delete("/delete-pgInfo/:id", deletePgInfo);


export default router;