
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [80, "Name cannot exceed 80 characters"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      unique: true,
      sparse: true,
    },

    phone: {
      type: String,
      trim: true,
      match: [
        /^[0-9]{10}$/,
        "Phone number must contain exactly 10 digits",
      ],
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "organizer", "admin"],
      default: "user",
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validate identifier and password requirements.
userSchema.pre("validate", function () {
  if (!this.email && !this.phone) {
    this.invalidate(
      "email",
      "An email address or phone number is required"
    );
  }

  if (this.authProvider === "local" && !this.password) {
    this.invalidate("password", "Password is required");
  }
});

// Hash passwords before saving a new or modified password.
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

// Verify a login password against the stored hash.
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    return false;
  }

  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
