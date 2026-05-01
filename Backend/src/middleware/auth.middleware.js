import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (!Array.isArray(roles)) roles = [roles];
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
