
import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("Name must be between 3 and 80 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isString()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must be between 8 and 72 characters"),
];

export const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
