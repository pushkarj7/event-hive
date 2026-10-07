import { User } from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, "Please provide name, email, and password", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User with this email already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password, // In production, hash this with bcrypt before saving
      role: role || "user",
      phone: phone || "",
    });

    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      createdAt: user.createdAt,
    };

    return successResponse(res, "User registered successfully", userSafe, 201);
  } catch (error) {
    return errorResponse(res, "Registration failed", 500, error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Please provide email and password", 400);
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return errorResponse(res, "Invalid email or password", 401);
    }

    const userSafe = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    return successResponse(res, "Login successful", {
      user: userSafe,
      token: "sample_jwt_token_replace_with_jwt_sign",
    });
  } catch (error) {
    return errorResponse(res, "Login failed", 500, error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  try {
    // If auth middleware sets req.userId or user id is passed
    const userId = req.query.id || req.body.userId;
    if (!userId) {
      return errorResponse(res, "User ID required", 400);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    return successResponse(res, "User profile fetched", user);
  } catch (error) {
    return errorResponse(res, "Failed to fetch profile", 500, error);
  }
};
