const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id || !["super_admin", "admin"].includes(decoded.role)) {
      return res
        .status(403)
        .json({ error: "Access denied: Admin role required" });
    }

    const admin = await Admin.findOne({ _id: decoded.id }).select("-password");
    if (!admin) {
      return res.status(401).json({ error: "Admin not found" });
    }
    req.user = {
      id: admin.admin_id,
      role: admin.role,
      username: admin.username,
    };
    next();
  } catch (error) {
    console.error("Error in adminAuthMiddleware:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = adminAuthMiddleware;
