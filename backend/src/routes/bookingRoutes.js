import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.put("/:id/cancel", cancelBooking);

export default router;
