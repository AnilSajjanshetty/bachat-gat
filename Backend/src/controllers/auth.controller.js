import jwt from "jsonwebtoken";
import env from "../config/env.js";
import * as authService from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const existing = await authService.findUserByMobile(req.body.mobile);
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Mobile already registered" });
    const user = await authService.createUser(req.body);
    res
      .status(201)
      .json({ success: true, data: { id: user._id, mobile: user.mobile } });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { mobile, password } = req.body;
    const user = await authService.findUserByMobile(mobile);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    const ok = await authService.verifyPassword(user, password);
    if (!ok)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
}
