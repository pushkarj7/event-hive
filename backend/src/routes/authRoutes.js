
import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  loginUser,
} from "../controllers/authController.js";

import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from "../validators/authValidator.js";

const router = Router();

// Protect authentication endpoints against brute-force & credential stuffing
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // 15 registrations per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many accounts created from this IP. Please try again after an hour.",
  },
});

router.post(
  "/register",
  registerLimiter,
  validateRegister,
  handleValidationErrors,
  registerUser
);

router.post(
  "/login",
  loginLimiter,
  validateLogin,
  handleValidationErrors,
  loginUser
);


export default router;
