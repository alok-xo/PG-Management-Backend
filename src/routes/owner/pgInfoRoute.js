import express from 'express';
import { addPgInfo, getAllPgInfo, updatePgInfo, deletePgInfo } from "../../controller/owner/pgInfo.js"
import middleware from "../../utils/middleware/auth.js"

const router = express.Router();

router.post("/add-pgInfo", middleware.auth, addPgInfo);
router.get("/get-allPgInfo", middleware.auth, getAllPgInfo);
router.patch("/update-pgInfo/:id", middleware.auth, updatePgInfo);
router.delete("/delete-pgInfo/:id", middleware.auth, deletePgInfo);


export default router;