
import { Router } from "express";
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

router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  registerUser
);

router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  loginUser
);

export default router;
