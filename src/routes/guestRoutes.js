import express from 'express';
import { addGuest, getGuestData, updateGuest, deleteGuest } from "../controller/guestInfo.js";

const router = express.Router();

router.post("/add-guest", addGuest);
router.get("/get-guestData", getGuestData)
router.patch("/update-guest/:guestId", updateGuest)
router.delete("/delete-guest/:id", deleteGuest)


export default router;