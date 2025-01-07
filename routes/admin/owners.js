import express from 'express';
import { addOwners, updateOwner } from '../../controller/admin/owners.js';

const router = express.Router();

router.post("/addOwners", addOwners);
router.put("/updateOwner/:id", updateOwner);

export default router;