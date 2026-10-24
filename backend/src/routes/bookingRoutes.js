import express from "express";
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  getTicket,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/user/:userId", getUserBookings);
router.put("/:id/cancel", cancelBooking);
router.get("/:id/ticket", getTicket);

export default router;
