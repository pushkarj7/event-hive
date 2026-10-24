import express from "express";
import { createEvent,getAllEvents ,getEventById,updateEvent,deleteEvent} from "../controllers/eventController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { requireOrganizer } from "../middlewares/requireOrganizerMiddleware.js";
import { uploadSingleEventImage } from "../middlewares/upload.js";
import { uploadEventImageController } from "../controllers/uploadController.js";
import {
  validateCreateEvent,
  validateUpdateEvent,
  handleEventValidationErrors,
} from "../validators/eventvalidator.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post(
  "/image",
  authMiddleware,
  requireOrganizer,
  uploadSingleEventImage,
  uploadEventImageController
);
router.post(
  "/",
  authMiddleware,
  requireOrganizer,
  validateCreateEvent,
  handleEventValidationErrors,
  createEvent
);
router.patch(
  "/:id",
  authMiddleware,
  requireOrganizer,
  validateUpdateEvent,
  handleEventValidationErrors,
  updateEvent
);
router.delete("/:id", authMiddleware, requireOrganizer, deleteEvent);

export default router;