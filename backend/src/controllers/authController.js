
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateAccessToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { sub: userId.toString() },
    secret,
    { expiresIn: "15m" }
  );
};

const isValidEmail = (email) => {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
};

// POST /api/v1/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};

    // 1. Validate request data.
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedName.length < 3 ||
      normalizedName.length > 80
    ) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 3 and 80 characters",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (
      password.length < 8 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and no more than 72 UTF-8 bytes",
      });
    }

    // 2. Check whether the email is already registered.
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 3. Create the user.
    // User.js hashes the password through its pre-save middleware.
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      password,
      role: "user",
      authProvider: "local",
    });

    // 4. Generate an access token.
    const accessToken = generateAccessToken(user._id);

    // 5. Return safe user data.
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
        accessToken,
      },
    });
  } catch (error) {
    // A database unique index protects against concurrent duplicates.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errors: Object.values(error.errors).map(
          (item) => item.message
        ),
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create account right now",
    });
  }
};

// POST /api/v1/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    // 1. Validate request data.
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      !isValidEmail(normalizedEmail) ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password format",
      });
    }

    // 2. Explicitly include the password hash for comparison.
    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // 3. Verify credentials with a generic error message.
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Check account status.
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account is unavailable",
      });
    }

    // 5. Generate an access token.
    const accessToken = generateAccessToken(user._id);

    // 6. Return safe user data.
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in right now",
    });
  }
};
