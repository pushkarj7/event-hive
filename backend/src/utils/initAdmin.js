import User from "../models/User.js";

export const initDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME?.trim() || "Event Hive Admin";

    if (!email || !password) {
      return;
    }

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      await User.create({
        name,
        email,
        password,
        role: "admin",
        authProvider: "local",
        isEmailVerified: true,
        isActive: true,
      });
      console.log(`[Admin Setup] Default admin created: ${email} (role: admin)`);
    } else {
      let needsSave = false;
      if (existingUser.role !== "admin") {
        existingUser.role = "admin";
        needsSave = true;
      }
      if (!existingUser.isActive) {
        existingUser.isActive = true;
        needsSave = true;
      }
      if (password) {
        existingUser.password = password;
        needsSave = true;
      }
      if (needsSave) {
        await existingUser.save();
        console.log(`[Admin Setup] Existing user ${email} updated with role: admin`);
      }
    }
  } catch (error) {
    console.error("[Admin Setup Error]:", error.message);
  }
};
