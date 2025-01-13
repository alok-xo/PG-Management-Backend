import express from 'express';
import { addOwners, getOwners, updateOwner } from '../../controller/admin/owners.js';

const router = express.Router();

router.post("/addOwners", addOwners);
router.put("/updateOwner/:id", updateOwner);
router.get("/getOwners", getOwners)

export default router;