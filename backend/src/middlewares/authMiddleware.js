// Middleware for route protection / user authentication
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    // In production, verify JWT token here using jsonwebtoken:
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = await User.findById(decoded.id).select("-password");

    req.token = token;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};
