import { body, validationResult } from "express-validator";

export const validateCreateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Event title is required")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Event category is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Event location is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid non-negative number"),

  body("totalSeats")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Total seats must be a positive integer"),

  body("date")
    .isISO8601()
    .withMessage("A valid event date is required"),
];

export const validateUpdateEvent = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Event title cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Title cannot exceed 150 characters"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid non-negative number"),

  body("totalSeats")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total seats must be a positive integer"),

  body("status")
    .optional()
    .isIn(["upcoming", "cancelled", "completed"])
    .withMessage("Status must be upcoming, cancelled, or completed"),
];

export const handleEventValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0]?.msg || "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
