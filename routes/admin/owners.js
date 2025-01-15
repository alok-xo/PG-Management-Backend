import express from 'express';
import { addOwners, deleteOwners, getOwners, updateOwner } from '../../controller/admin/owners.js';

const router = express.Router();

router.post("/addOwners", addOwners);
router.put("/updateOwner/:id", updateOwner);
router.get("/getOwners", getOwners)
router.delete("/deleteOwner/:id", deleteOwners)

export default router;